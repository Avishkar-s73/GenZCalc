import Calculator from "@/components/Calculator";
const Index = () => {
  return <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Mathematical animated background */}
      <div className="absolute inset-0 bg-black z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-darkPurple/80 via-black to-black"></div>
        <div className="absolute inset-0 opacity-30">
          {/* Math equations grid */}
          <div className="absolute inset-0 grid grid-cols-12 gap-4 p-4 text-neon-purple/20 overflow-hidden">
            {Array.from({
            length: 50
          }).map((_, i) => <div key={i} className="text-xs opacity-50 animate-float" style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i % 5 * 0.2}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}>
                {i % 8 === 0 && 'E = mc²'}
                {i % 8 === 1 && 'f(x) = Σ(x)'}
                {i % 8 === 2 && '∫(x²)dx'}
                {i % 8 === 3 && 'sin(θ)²+cos(θ)²=1'}
                {i % 8 === 4 && 'Δx→0'}
                {i % 8 === 5 && '∇×F'}
                {i % 8 === 6 && 'P(A|B)'}
                {i % 8 === 7 && 'λx.x'}
              </div>)}
          </div>
        </div>
        {/* Animated grid lines */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
          {Array.from({
          length: 10
        }).map((_, i) => <div key={`h-${i}`} className="border-t border-neon-purple/5"></div>)}
          {Array.from({
          length: 10
        }).map((_, i) => <div key={`v-${i}`} className="border-l border-neon-purple/5"></div>)}
        </div>
        {/* Moving particles */}
        <div className="absolute inset-0">
          {Array.from({
          length: 20
        }).map((_, i) => <div key={`p-${i}`} className="absolute rounded-full bg-neon-purple/30 animate-pulse" style={{
          width: `${Math.max(2, Math.random() * 6)}px`,
          height: `${Math.max(2, Math.random() * 6)}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${1 + Math.random() * 3}s`,
          filter: 'blur(1px)'
        }}></div>)}
        </div>
      </div>
      
      {/* Calculator container */}
      <div className="relative z-10">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <Calculator />
      </div>
      
      <div className="mt-10 text-center relative z-10">
        <h1 className="text-3xl font-bold neon-text mb-2 py-[10px]">GenZCalc</h1>
        <p className="text-muted-foreground max-w-md text-center">A fun GenZ sci-fi themed calculator with both basic and scientific modes. Toggle between modes to access advanced functions.</p>
      </div>
    </div>;
};
export default Index;