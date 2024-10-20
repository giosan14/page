import Navigation from './components/Navigation'
import MainContent from './components/MainContent'

function App() {
  return (
    <div className="min-h-screen gradient-bg text-white">
      <div className="h-1 bg-gradient-to-r from-yellow-accent to-red-accent"></div>
      <div className="flex">
        <Navigation />
        <MainContent />
      </div>
    </div>
  )
}

export default App