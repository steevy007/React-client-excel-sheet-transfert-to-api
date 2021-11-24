import React,{useEffect} from 'react'
import axios from 'axios'
import { IndividualData } from './IndividualData'

export const Data = ({excelData,dataSend,handleLoadToSave}) => {
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }
    useEffect(()=>{
        const startTime=performance.now()
        axios.post('http://localhost/API_TEST__/api/MultiCreateFormation',{data:dataSend.data})
        .then(res=>{
            handleLoadToSave(false)
            const endTime=performance.now()
            const milliseconde=endTime - startTime
            console.log(`Les Donnee sont sauvegarde dans ${millisToMinutesAndSeconds(milliseconde)}`)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return excelData.map((individualExcelData,index)=>(
        <tr key={index}>
            <IndividualData individualExcelData={individualExcelData}/>
        </tr>        
    ))
}
