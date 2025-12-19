import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Sphere } from '@react-three/drei'

function FloatingShape({ position, color, scale }) {
    const meshRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.cos(t / 4) / 8 + 0.2
            meshRef.current.rotation.y = Math.sin(t / 4) / 8 + 0.2
            meshRef.current.position.y = position[1] + Math.sin(t / 1.5) / 10
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position} scale={scale}>
                {/* Using a distorted sphere or simple shapes for abstract feel */}
                <icosahedronGeometry args={[1, 0]} />
                {/* <sphereGeometry args={[1, 32, 32]} /> */}
                <meshStandardMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.1}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    )
}

export default function AbstractBackground() {
    return (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-white to-gray-50 h-full w-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} />

                {/* Soft abstract shapes floating */}
                <FloatingShape position={[3, 1, 0]} color="#E0F2FE" scale={1.8} /> {/* Pale Blue */}
                <FloatingShape position={[-3, -1, -2]} color="#F0FDF4" scale={2.2} /> {/* Pale Green */}
                <FloatingShape position={[1, -2, 1]} color="#F8FAFC" scale={1.2} /> {/* White/Gray */}

                <Environment preset="city" />
            </Canvas>
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" /> {/* Slight overlay for text readability */}
        </div>
    )
}
