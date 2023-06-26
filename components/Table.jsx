'use client'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function MyTable({handleClick, data, filter}) {

  //button to handle View button click.
  const actionTemplate = (e) =>{
    return <button className='bg-blue-400 text-white py-1 px-3 rounded-md shadow-md' onClick={()=> handleClick(e._id)}>View</button>
  }

  //Prime react is used to display table along with sort and pagination.
  return (
      <>
        <DataTable value={data} paginator rows={5} scrollable scrollHeight="400px" rowsPerPageOptions={[5, 10, 25, 50]} filters={filter}>
          <Column field="Index" style={{ minWidth: '100px' }} header="#" body={(_, {rowIndex}) => rowIndex +1 }/>
          <Column field='name' style={{ minWidth: '100px' }} header='Name'/>  
          <Column field='address' style={{ minWidth: '100px' }} header='Address'/>
          <Column field='city' style={{ minWidth: '100px' }} header='City'sortable/>
          <Column field='pincode' header='Pin Code'/>
          <Column field='country' style={{ minWidth: '100px' }} header='Country'sortable/>
          <Column body={actionTemplate} header="Actions" style={{ textAlign: 'center', width: '6em' }} />
        </DataTable>
      
      </>
  );
}

export default MyTable;