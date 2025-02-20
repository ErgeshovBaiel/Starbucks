import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../redux/slices/CoffeeSlice'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import Spinner from '../../components/spinner/Spinner'

const Coffee = () => {
  const dispatch = useDispatch()
  const { menu, isLoading } = useSelector(state => state.coffee)

  const [openItems, setOpenItems] = useState({})

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])
  useEffect(() => {
    if (menu?.menus) {
      const hotCoffeeItem = menu.menus
        .flatMap(el => el.children)
        .find(item => item.name === 'Hot Coffee')

      if (hotCoffeeItem) {
        setOpenItems(prev => ({
          ...prev,
          [hotCoffeeItem.id]: true
        }))
      }
    }
  }, [menu])

  if (isLoading) {
    return <Spinner />
  }

  const toggleItem = itemId => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  return (
      <div>
        {menu?.menus?.map(el => (
          <div key={el.id}>
            <h3 className='text-2xl font-bold mt-4 ml-4'>{el.name}</h3>
            {el.children.map(item => (
              <div key={item.id}>
                <h4
                  onClick={() => toggleItem(item.id)}
                  className='ml-4 text-xl font-semibold text-gray-800 cursor-pointer'
                >
                  {item.name}
                </h4>
                {openItems[item.id] && (
                  <div className='w-full max-w-5xl mx-auto'>
                    {item.children.length > 0 ? (
                      item.children.map(subItem => (
                        <div
                          key={subItem.id}
                          className='flex flex-wrap justify-center gap-20'
                        >
                          <h4 className='w-full text-3xl font-semibold text-center mt-4'>
                            {subItem.name}
                          </h4>
                          {subItem.products?.map(product => (
                            <div
                              key={product.productNumber}
                              className='flex flex-col items-center w-[150px]'
                            >
                              <div className='w-40 h-40  rounded-full flex items-center justify-center overflow-hidden'>
                                <img
                                  src={product.assets?.masterImage?.uri}
                                  alt={product.name}
                                  className='w-36 h-36 object-cover'
                                />
                              </div>
                              <h5 className='text-center text-sm font-semibold mt-2'>
                                {product.name}
                              </h5>
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <div className='flex flex-wrap justify-center gap-7.5'>
                        {item.products?.map(product => (
                          <div
                            key={product.productNumber}
                            className='flex flex-col items-center w-[150px]'
                          >
                            <div className='w-40 h-40  rounded-full flex items-center justify-center overflow-hidden'>
                              <img
                                src={product.assets?.masterImage?.uri}
                                alt={product.name}
                                className='w-36 h-36 object-cover'
                              />
                            </div>
                            <h5 className='text-center text-sm font-semibold mt-2'>
                              {product.name}
                            </h5>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
  )
}

export default Coffee
