'use client';

import { useGLTF, OrbitControls, Stage, Environment, useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

interface ProductModel3DProps {
	productName: string;
	category?: string;
	className?: string;
}

function getGemstoneColor(name: string): THREE.Color | null {
	const gemColors: Record<string, string> = {
		'Clear': '#FFFFFF',
		'Topaz': '#FFC87C',
		'Champagne': '#FFE4B5',
		'Pink': '#FFC0CB',
		'Orange': '#FFA500',
		'Garnet': '#9B2D30',
		'Peridot': '#A6D608',
		'Emerald': '#50C878',
		'Olive Green': '#6B8E23',
		'Aquamarine': '#7FFFD4',
		'Blue Topaz': '#55C2FF',
		'Ruby': '#E0115F',
		'Violet': '#8F00FF',
		'Lavender': '#E6E6FA',
		'Tanzanite': '#4B0082',
		'Sapphire': '#0F52BA',
		'Black': '#333333',
	};

	// Return null if name is undefined or empty
	if (!name || name.trim() === '') {
		return null;
	}

	// Check if name starts with any of the gem types
	for (const [gemName, colorCode] of Object.entries(gemColors)) {
		if (name.toLowerCase().startsWith(gemName.toLowerCase())) {
			return new THREE.Color(colorCode);
		}
	}

	// Return null if no match found
	return null;
}

function Model({ url, category }: { url: string; category?: string }) {
	const { scene } = useGLTF(url);
	const modelRef = useRef<THREE.Object3D>(null);
	const gemTexture = useTexture('/three/gem/texture.jpg');
	
	// Determine if gold or silver based on category
	const isGold = category?.includes('gold');
	
	useEffect(() => {
		if (!modelRef.current) return;
		
		// Create a shared gem material with the texture
		const gemMaterial = new THREE.MeshPhysicalMaterial({
			map: gemTexture,
			metalness: 1,
			roughness: 0.05,
			transmission: 0.9,
			thickness: 0.5,
			envMapIntensity: 5,
			clearcoat: 1.0,
			clearcoatRoughness: 0.1,
		});
		
		// Apply materials to all meshes in the scene
		modelRef.current.traverse((node) => {
			if (node instanceof THREE.Mesh) {
				// Check if the node name indicates this is a gemstone
				const gemColor = node.name ? getGemstoneColor(node.name) : null;
				console.log(node.name, gemColor ? 'is gemstone' : 'is metal');
				
				if (gemColor) {
					// Clone the gem material to tint it based on the gem type
					const tintedMaterial = gemMaterial.clone();
					tintedMaterial.color = gemColor;
					node.material = tintedMaterial;
				} else {
					// Apply metal material
					node.material = new THREE.MeshStandardMaterial({
						color: isGold ? new THREE.Color('#FFD700') : new THREE.Color('#E1E1E1'),
						metalness: isGold ? 0.85 : 0.9,
						roughness: isGold ? 0.15 : 0.1,
						envMapIntensity: isGold ? 1.2 : 1.0,
					});
				}
			}
		});
	}, [isGold, gemTexture]);
	
	return <primitive object={scene} ref={modelRef} />;
}

// Custom environment component optimized for jewelry
function JewelryEnvironment({ isGold }: { isGold?: boolean }) {	
	return isGold ? (
		<Environment
			preset="sunset"
			background={false}
			resolution={256}
		/>
	) : (
		<Environment
			files="/three/silver/environment.jpg"
			background={false}
			resolution={256}
		/>
	);
}

export function ProductModel3D({ productName, category, className = '' }: ProductModel3DProps) {
	const [modelUrl, setModelUrl] = useState<string | null>(null);
	const formattedName = productName.toLowerCase().replace(/\s+/g, '-');
	const url = `/three/${formattedName}/model.gltf`;
	const isGold = category?.includes('gold');
	
	useEffect(() => {
		// Check if the model file exists before setting the URL
		fetch(url, { method: 'HEAD' })
			.then(response => {
				if (response.ok) {
					setModelUrl(url);
				} else {
					console.warn(`3D model not found at ${url}`);
					setModelUrl(null);
				}
			})
			.catch(error => {
				console.warn(`Error checking 3D model: ${error}`);
				setModelUrl(null);
			});
	}, [url]);

	if (!modelUrl) {
		return null;
	}

	return (
		<div className={`w-full h-[350px] rounded-lg bg-neutral-100 ${className}`}>
			<Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
				<Suspense fallback={null}>
					<JewelryEnvironment isGold={isGold ?? false} />
					<Stage 
						environment={isGold ? "sunset" : null} 
						intensity={0.2} 
						shadows={{ type: 'contact', opacity: 0.75, blur: 2 }}
						adjustCamera={1.5}
						preset="rembrandt"
					>
						<Model url={modelUrl} category={category} />
					</Stage>
					<OrbitControls 
						autoRotate 
						autoRotateSpeed={1}
						enableZoom={true}
						enablePan={false}
						minPolarAngle={Math.PI / 4}
						maxPolarAngle={Math.PI / 1.5}
						dampingFactor={0.05}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
}
