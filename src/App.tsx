
import './App.css'
import FormRegisterProduct from './components/formregisterproduct'
import ListProduct from './components/listproduct'

console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

const App: React.FC = () => {

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-2 overflow-hidden'>
      <div className='w-full  flex flex-col sm:flex-row gap-2 items-center justify-center'>
        <FormRegisterProduct />
        <ListProduct />
      </div>
    </div>
  )
}

export default App
