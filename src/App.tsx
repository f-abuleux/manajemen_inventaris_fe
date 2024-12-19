
import './App.css'
import FormRegisterProduct from './components/formregisterproduct'
import ListProduct from './components/listproduct'

const App: React.FC = () => {

  return (
    <div className='w-full gap-2 mt-2 sm:mt-20 flex sm:flex-row flex-col item-center sm:items-start justify-center bg-gradient-to-br from-blue-50 sm:p-0 p-2 to-purple-50 '>
      <FormRegisterProduct />
      <ListProduct />
    </div>
  )
}

export default App
