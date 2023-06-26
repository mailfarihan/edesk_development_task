'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

const List = ({data, handleFilter}) => {

  const [expand, setExpand] = useState(false)

  const filter = (e) =>{
    handleFilter(e)
  }

  return (
    <>
        <a onClick={()=> data.items? (setExpand((prev)=>!prev)):(filter(data.name))} className='list-group-item cursor-pointer'>
          <span className='mr-3'>
            {data.items && expand? 
              (<FontAwesomeIcon icon={faMinus}/>
              ):(
                <>
                  {data.items &&
                    <FontAwesomeIcon icon={faPlus} />
                  }
                </>
              )
            }
            
            </span><span className='font-bold'>{data?.name}</span>
        </a>

        {data.items && 
          <div className='list-group'style={{ display: expand ? "block" : "none"}}>
            {data.items?.map((ele)=>(
              <List key={ele.name} data={ele} handleFilter={filter}/>
            ))}
          </div>
        }
    </>
  )
}

export default List