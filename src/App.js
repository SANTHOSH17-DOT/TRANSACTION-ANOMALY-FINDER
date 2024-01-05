import './App.css';
import { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react'
import { CategoryScale,LinearScale,PointElement,LineElement,Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie,Line } from 'react-chartjs-2';
import { Spinner, Flex, Text } from '@chakra-ui/react'
import {useDropzone} from 'react-dropzone';
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,ArcElement, Tooltip, Legend);

function App() {
  const [piedata,setPieData] = useState({labels: ['Anomoly', 'Normal'],datasets: []});
  const [lineData, setLineData] = useState({labels: ['1,2,3,4,5,6,7,8,9,10'],datasets: []});
  const [isTraining, setIsTraining] = useState(false);
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  useEffect(() => {
    const piedata = {
      labels: ['Anomoly', 'Normal'],
      datasets: [
        {
          label: '# of transactions',
          data: [12, 19],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    const lineData = {
      labels: ['1','2','3','4','5','6','7','8','9','10'],
      datasets: [
        {
          label: 'Dataset',
          data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7],
          // fill: false,
          backgroundColor: ['rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgba(54, 162, 235)','rgba(54, 162, 235)','rgba(54, 162, 235)','rgba(54, 162, 235)','rgba(54, 162, 235)','rgba(54, 162, 235)','rgba(54, 162, 235)',],
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    }
    setPieData(piedata)
    setLineData(lineData)
    return () => {
    }
  }, [])
  
  
  return (
    <div className="App">
      <Heading>Transaction Anomoly Detection</Heading>
      <Flex width="100%" justifyContent="center" alignItems="center">
        <div style={{margin:"50px"}}>
          <Pie data={piedata} />
        </div>
        <div style={{margin:"50px"}}>
          <Flex border="2px solid" borderColor='blue.500' marginBottom="20px" justifyContent="space-around" paddingY="20px" borderRadius="10px">
            {
              isTraining ? (<><Text>Model training</Text> <Spinner  thickness='4px'speed='0.65s'emptyColor='gray.200'color='blue.500'size='md' /></> ): <Text>Model trained</Text>
            }
            
          </Flex>
          <section className="container" style={{border:"2px dotted", padding:"20px"}}>
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop the transaction csv here</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </section>
        </div>
      </Flex>
      <Flex width="100%" margin="auto" maxW="800px" justifyContent="center" marginBottom="100px" >
        <Line data={lineData} />;
      </Flex>
    </div>
  );
}

export default App;
