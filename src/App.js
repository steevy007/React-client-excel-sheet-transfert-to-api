import {useState} from 'react'
import {Data} from './Components/Data'
import * as XLSX from 'xlsx'

function App() {
  
  // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);
  const [isLoadToSave,setIsLoadToSave]=useState(false)
  const [dataSend,setDataSend]=useState({
    data:[]
  })  
 
  const handleLoadToSave=(value)=>{
    setIsLoadToSave(value)
  }
  // submit
  const [excelData, setExcelData]=useState(null);
  // it will contain array of objects

  // handle File
  const fileType=['application/vnd.ms-excel'];
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      // console.log(selectedFile.type);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFile(e.target.result);
        } 
      }
      else{
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('plz select your file');
    }
  }

  // submit function
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      setDataSend({
        data:data
      })
      handleLoadToSave(true)
    }
    else{
      setExcelData(null);
    }
  }
  
  return (
    <div className="container">

      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete="off"
        onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
          onChange={handleFile} required></input>                  
          {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>{excelFileError}</div>}
          <button type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}}>Submit</button>
        </form>
      </div>

      <br></br>
      {
        isLoadToSave && <center><i><h5>Is Saving......</h5></i></center>
      }
      <br></br>
      <hr></hr>

      {/* view file section */}
      <h5>View Excel file</h5>
      <div className='viewer'>
        {excelData===null&&<>No file selected</>}
        {excelData!==null&&(
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>LIBELLE</th>
                  <th scope='col'>DESCRIPTION</th>
                  <th scope='col'>IMAGE</th>
                  <th scope='col'>CATEGORIE ID</th>                  
                </tr>
              </thead>
              <tbody>
                <Data handleLoadToSave={handleLoadToSave} excelData={excelData} dataSend={dataSend}/>
              </tbody>
            </table>            
          </div>
        )}       
      </div>

    </div>
  );
}

export default App;