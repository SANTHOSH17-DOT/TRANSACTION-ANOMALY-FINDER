import './App.css';
import { useEffect, useState, useRef  } from 'react';
import { Heading,Button } from '@chakra-ui/react'
import { CategoryScale,LinearScale,PointElement,LineElement,Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie,Line,Scatter } from 'react-chartjs-2';
import { Spinner, Flex, Text, Badge,useDisclosure } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,ArcElement, Tooltip, Legend);

function App() {
  const [piedata,setPieData] = useState({labels: ['Anomaly', 'Normal'],datasets: []});
  const [lineData, setLineData] = useState({labels: [],datasets: []});
  const [isTraining, setIsTraining] = useState(false);
  const [tableTransactions,setTableTransactions] = useState([])
  // const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [simulating, setSimulating] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const transactions = [
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 9839.64,
      "nameOrig": "C1231006815",
      "oldbalanceOrg": 170136,
      "newbalanceOrig": 160296.36,
      "nameDest": "M1979787155",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 1864.28,
      "nameOrig": "C1666544295",
      "oldbalanceOrg": 21249,
      "newbalanceOrig": 19384.72,
      "nameDest": "M2044282225",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 181,
      "nameOrig": "C1305486145",
      "oldbalanceOrg": 181,
      "newbalanceOrig": 0,
      "nameDest": "C553264065",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 1,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "CASH_OUT",
      "amount": 181,
      "nameOrig": "C840083671",
      "oldbalanceOrg": 181,
      "newbalanceOrig": 0,
      "nameDest": "C38997010",
      "oldbalanceDest": 21182,
      "newbalanceDest": 0,
      "isFraud": 1,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 11668.14,
      "nameOrig": "C2048537720",
      "oldbalanceOrg": 41554,
      "newbalanceOrig": 29885.86,
      "nameDest": "M1230701703",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 7817.71,
      "nameOrig": "C90045638",
      "oldbalanceOrg": 53860,
      "newbalanceOrig": 46042.29,
      "nameDest": "M573487274",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 7107.77,
      "nameOrig": "C154988899",
      "oldbalanceOrg": 183195,
      "newbalanceOrig": 176087.23,
      "nameDest": "M408069119",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 7861.64,
      "nameOrig": "C1912850431",
      "oldbalanceOrg": 176087.23,
      "newbalanceOrig": 168225.59,
      "nameDest": "M633326333",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 4024.36,
      "nameOrig": "C1265012928",
      "oldbalanceOrg": 2671,
      "newbalanceOrig": 0,
      "nameDest": "M1176932104",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "DEBIT",
      "amount": 5337.77,
      "nameOrig": "C712410124",
      "oldbalanceOrg": 41720,
      "newbalanceOrig": 36382.23,
      "nameDest": "C195600860",
      "oldbalanceDest": 41898,
      "newbalanceDest": 40348.79,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "DEBIT",
      "amount": 9644.94,
      "nameOrig": "C1900366749",
      "oldbalanceOrg": 4465,
      "newbalanceOrig": 0,
      "nameDest": "C997608398",
      "oldbalanceDest": 10845,
      "newbalanceDest": 157982.12,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 3099.97,
      "nameOrig": "C249177573",
      "oldbalanceOrg": 20771,
      "newbalanceOrig": 17671.03,
      "nameDest": "M2096539129",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 2560.74,
      "nameOrig": "C1648232591",
      "oldbalanceOrg": 5070,
      "newbalanceOrig": 2509.26,
      "nameDest": "M972865270",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 11633.76,
      "nameOrig": "C1716932897",
      "oldbalanceOrg": 10127,
      "newbalanceOrig": 0,
      "nameDest": "M801569151",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 4098.78,
      "nameOrig": "C1026483832",
      "oldbalanceOrg": 503264,
      "newbalanceOrig": 499165.22,
      "nameDest": "M1635378213",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "CASH_OUT",
      "amount": 229133.94,
      "nameOrig": "C905080434",
      "oldbalanceOrg": 15325,
      "newbalanceOrig": 0,
      "nameDest": "C476402209",
      "oldbalanceDest": 5083,
      "newbalanceDest": 51513.44,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 1563.82,
      "nameOrig": "C761750706",
      "oldbalanceOrg": 450,
      "newbalanceOrig": 0,
      "nameDest": "M1731217984",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 1157.86,
      "nameOrig": "C1237762639",
      "oldbalanceOrg": 21156,
      "newbalanceOrig": 19998.14,
      "nameDest": "M1877062907",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 671.64,
      "nameOrig": "C2033524545",
      "oldbalanceOrg": 15123,
      "newbalanceOrig": 14451.36,
      "nameDest": "M473053293",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 215310.3,
      "nameOrig": "C1670993182",
      "oldbalanceOrg": 705,
      "newbalanceOrig": 0,
      "nameDest": "C1100439041",
      "oldbalanceDest": 22425,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 1373.43,
      "nameOrig": "C20804602",
      "oldbalanceOrg": 13854,
      "newbalanceOrig": 12480.57,
      "nameDest": "M1344519051",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "DEBIT",
      "amount": 9302.79,
      "nameOrig": "C1566511282",
      "oldbalanceOrg": 11299,
      "newbalanceOrig": 1996.21,
      "nameDest": "C1973538135",
      "oldbalanceDest": 29832,
      "newbalanceDest": 16896.7,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "DEBIT",
      "amount": 1065.41,
      "nameOrig": "C1959239586",
      "oldbalanceOrg": 1817,
      "newbalanceOrig": 751.59,
      "nameDest": "C515132998",
      "oldbalanceDest": 10330,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 3876.41,
      "nameOrig": "C504336483",
      "oldbalanceOrg": 67852,
      "newbalanceOrig": 63975.59,
      "nameDest": "M1404932042",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 311685.89,
      "nameOrig": "C1984094095",
      "oldbalanceOrg": 10835,
      "newbalanceOrig": 0,
      "nameDest": "C932583850",
      "oldbalanceDest": 6267,
      "newbalanceDest": 2719172.89,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 6061.13,
      "nameOrig": "C1043358826",
      "oldbalanceOrg": 443,
      "newbalanceOrig": 0,
      "nameDest": "M1558079303",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 9478.39,
      "nameOrig": "C1671590089",
      "oldbalanceOrg": 116494,
      "newbalanceOrig": 107015.61,
      "nameDest": "M58488213",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 8009.09,
      "nameOrig": "C1053967012",
      "oldbalanceOrg": 10968,
      "newbalanceOrig": 2958.91,
      "nameDest": "M295304806",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 8901.99,
      "nameOrig": "C1632497828",
      "oldbalanceOrg": 2958.91,
      "newbalanceOrig": 0,
      "nameDest": "M33419717",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 9920.52,
      "nameOrig": "C764826684",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "M1940055334",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 3448.92,
      "nameOrig": "C2103763750",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "M335107734",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 4206.84,
      "nameOrig": "C215078753",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "M1757317128",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 5885.56,
      "nameOrig": "C840514538",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "M1804441305",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 5307.88,
      "nameOrig": "C1768242710",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "M1971783162",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 5031.22,
      "nameOrig": "C247113419",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "M151442075",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 24213.67,
      "nameOrig": "C1238616099",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "M70695990",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 8603.42,
      "nameOrig": "C1608633989",
      "oldbalanceOrg": 253,
      "newbalanceOrig": 0,
      "nameDest": "M1615617512",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 2791.42,
      "nameOrig": "C923341586",
      "oldbalanceOrg": 300481,
      "newbalanceOrig": 297689.58,
      "nameDest": "M107994825",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 7413.54,
      "nameOrig": "C1470868839",
      "oldbalanceOrg": 297689.58,
      "newbalanceOrig": 290276.03,
      "nameDest": "M1426725223",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 3295.19,
      "nameOrig": "C711197015",
      "oldbalanceOrg": 233633,
      "newbalanceOrig": 230337.81,
      "nameDest": "M1384454980",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 1684.81,
      "nameOrig": "C1481594086",
      "oldbalanceOrg": 297,
      "newbalanceOrig": 0,
      "nameDest": "M1569435561",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "DEBIT",
      "amount": 5758.59,
      "nameOrig": "C1466917878",
      "oldbalanceOrg": 32604,
      "newbalanceOrig": 26845.41,
      "nameDest": "C1297685781",
      "oldbalanceDest": 209699,
      "newbalanceDest": 16997.22,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "CASH_OUT",
      "amount": 110414.71,
      "nameOrig": "C768216420",
      "oldbalanceOrg": 26845.41,
      "newbalanceOrig": 0,
      "nameDest": "C1509514333",
      "oldbalanceDest": 288800,
      "newbalanceDest": 2415.16,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 7823.46,
      "nameOrig": "C260084831",
      "oldbalanceOrg": 998,
      "newbalanceOrig": 0,
      "nameDest": "M267814113",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 5086.48,
      "nameOrig": "C598357562",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "M1593224710",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 5281.48,
      "nameOrig": "C1440738283",
      "oldbalanceOrg": 152019,
      "newbalanceOrig": 146737.52,
      "nameDest": "M1849015357",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 13875.98,
      "nameOrig": "C484199463",
      "oldbalanceOrg": 15818,
      "newbalanceOrig": 1942.02,
      "nameDest": "M2008106788",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "CASH_OUT",
      "amount": 56953.9,
      "nameOrig": "C1570470538",
      "oldbalanceOrg": 1942.02,
      "newbalanceOrig": 0,
      "nameDest": "C824009085",
      "oldbalanceDest": 70253,
      "newbalanceDest": 64106.18,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "CASH_OUT",
      "amount": 5346.89,
      "nameOrig": "C512549200",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C248609774",
      "oldbalanceDest": 652637,
      "newbalanceDest": 6453430.91,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 2204.04,
      "nameOrig": "C1615801298",
      "oldbalanceOrg": 586,
      "newbalanceOrig": 0,
      "nameDest": "M490391704",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 2641.47,
      "nameOrig": "C460570271",
      "oldbalanceOrg": 23053,
      "newbalanceOrig": 20411.53,
      "nameDest": "M1653361344",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "CASH_OUT",
      "amount": 23261.3,
      "nameOrig": "C2072313080",
      "oldbalanceOrg": 20411.53,
      "newbalanceOrig": 0,
      "nameDest": "C2001112025",
      "oldbalanceDest": 25742,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 2330.64,
      "nameOrig": "C816944408",
      "oldbalanceOrg": 203543,
      "newbalanceOrig": 201212.36,
      "nameDest": "M909132503",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 1614.64,
      "nameOrig": "C912966811",
      "oldbalanceOrg": 41276,
      "newbalanceOrig": 39661.36,
      "nameDest": "M1792384402",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 9164.71,
      "nameOrig": "C1458621573",
      "oldbalanceOrg": 47235.77,
      "newbalanceOrig": 38071.06,
      "nameDest": "M1658980982",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 2970.97,
      "nameOrig": "C46941357",
      "oldbalanceOrg": 38071.06,
      "newbalanceOrig": 35100.09,
      "nameDest": "M1152606315",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 38.66,
      "nameOrig": "C343345308",
      "oldbalanceOrg": 16174,
      "newbalanceOrig": 16135.34,
      "nameDest": "M1714688478",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 2252.44,
      "nameOrig": "C104716441",
      "oldbalanceOrg": 1627,
      "newbalanceOrig": 0,
      "nameDest": "M1506951181",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 62610.8,
      "nameOrig": "C1976401987",
      "oldbalanceOrg": 79114,
      "newbalanceOrig": 16503.2,
      "nameDest": "C1937962514",
      "oldbalanceDest": 517,
      "newbalanceDest": 8383.29,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "DEBIT",
      "amount": 5529.13,
      "nameOrig": "C867288517",
      "oldbalanceOrg": 8547,
      "newbalanceOrig": 3017.87,
      "nameDest": "C242131142",
      "oldbalanceDest": 10206,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "CASH_OUT",
      "amount": 82940.31,
      "nameOrig": "C1528834618",
      "oldbalanceOrg": 3017.87,
      "newbalanceOrig": 0,
      "nameDest": "C476800120",
      "oldbalanceDest": 132372,
      "newbalanceDest": 49864.36,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "DEBIT",
      "amount": 4510.22,
      "nameOrig": "C280615803",
      "oldbalanceOrg": 10256,
      "newbalanceOrig": 5745.78,
      "nameDest": "C1254526270",
      "oldbalanceDest": 10697,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "DEBIT",
      "amount": 8727.74,
      "nameOrig": "C166694583",
      "oldbalanceOrg": 882770,
      "newbalanceOrig": 874042.26,
      "nameDest": "C1129670968",
      "oldbalanceDest": 12636,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 2599.46,
      "nameOrig": "C885910946",
      "oldbalanceOrg": 874042.26,
      "newbalanceOrig": 871442.79,
      "nameDest": "M1860591867",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "DEBIT",
      "amount": 4874.49,
      "nameOrig": "C811207775",
      "oldbalanceOrg": 153,
      "newbalanceOrig": 0,
      "nameDest": "C1971489295",
      "oldbalanceDest": 253104,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 6440.78,
      "nameOrig": "C1161148117",
      "oldbalanceOrg": 2192,
      "newbalanceOrig": 0,
      "nameDest": "M516875052",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 4910.14,
      "nameOrig": "C1131592118",
      "oldbalanceOrg": 41551,
      "newbalanceOrig": 36640.86,
      "nameDest": "M589987187",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 6444.64,
      "nameOrig": "C1262609629",
      "oldbalanceOrg": 12019,
      "newbalanceOrig": 5574.36,
      "nameDest": "M587180314",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "DEBIT",
      "amount": 5149.66,
      "nameOrig": "C1955990522",
      "oldbalanceOrg": 4782,
      "newbalanceOrig": 0,
      "nameDest": "C1330106945",
      "oldbalanceDest": 52752,
      "newbalanceDest": 24044.18,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 7292.16,
      "nameOrig": "C69673470",
      "oldbalanceOrg": 216827,
      "newbalanceOrig": 209534.84,
      "nameDest": "M1082411691",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "CASH_OUT",
      "amount": 47458.86,
      "nameOrig": "C527211736",
      "oldbalanceOrg": 209534.84,
      "newbalanceOrig": 162075.98,
      "nameDest": "C2096057945",
      "oldbalanceDest": 52120,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "CASH_OUT",
      "amount": 136872.92,
      "nameOrig": "C1533123860",
      "oldbalanceOrg": 162075.98,
      "newbalanceOrig": 25203.05,
      "nameDest": "C766572210",
      "oldbalanceDest": 217806,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "CASH_OUT",
      "amount": 94253.33,
      "nameOrig": "C1718906711",
      "oldbalanceOrg": 25203.05,
      "newbalanceOrig": 0,
      "nameDest": "C977993101",
      "oldbalanceDest": 99773,
      "newbalanceDest": 965870.05,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 2998.04,
      "nameOrig": "C71802912",
      "oldbalanceOrg": 12030,
      "newbalanceOrig": 9031.96,
      "nameDest": "M2134271532",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 3454.08,
      "nameOrig": "C686349795",
      "oldbalanceOrg": 9031.96,
      "newbalanceOrig": 5577.88,
      "nameDest": "M1831010686",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 4316.2,
      "nameOrig": "C1423768154",
      "oldbalanceOrg": 10999,
      "newbalanceOrig": 6682.8,
      "nameDest": "M404222443",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 2131.84,
      "nameOrig": "C1987977423",
      "oldbalanceOrg": 224,
      "newbalanceOrig": 0,
      "nameDest": "M61073295",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 12986.61,
      "nameOrig": "C807322507",
      "oldbalanceOrg": 23350,
      "newbalanceOrig": 10363.39,
      "nameDest": "M396485834",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 42712.39,
      "nameOrig": "C283039401",
      "oldbalanceOrg": 10363.39,
      "newbalanceOrig": 0,
      "nameDest": "C1330106945",
      "oldbalanceDest": 57901.66,
      "newbalanceDest": 24044.18,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 77957.68,
      "nameOrig": "C207471778",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1761291320",
      "oldbalanceDest": 94900,
      "newbalanceDest": 22233.65,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 17231.46,
      "nameOrig": "C1243171897",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C783286238",
      "oldbalanceDest": 24672,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 78766.03,
      "nameOrig": "C1376151044",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1749186397",
      "oldbalanceDest": 103772,
      "newbalanceDest": 277515.05,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 224606.64,
      "nameOrig": "C873175411",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C766572210",
      "oldbalanceDest": 354678.92,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 125872.53,
      "nameOrig": "C1443967876",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C392292416",
      "oldbalanceDest": 348512,
      "newbalanceDest": 3420103.09,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 379856.23,
      "nameOrig": "C1449772539",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1590550415",
      "oldbalanceDest": 900180,
      "newbalanceDest": 19169204.93,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 1505626.01,
      "nameOrig": "C926859124",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C665576141",
      "oldbalanceDest": 29031,
      "newbalanceDest": 5515763.34,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 554026.99,
      "nameOrig": "C1603696865",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C766572210",
      "oldbalanceDest": 579285.56,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 147543.1,
      "nameOrig": "C12905860",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1359044626",
      "oldbalanceDest": 223220,
      "newbalanceDest": 16518.36,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 761507.39,
      "nameOrig": "C412788346",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1590550415",
      "oldbalanceDest": 1280036.23,
      "newbalanceDest": 19169204.93,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 1429051.47,
      "nameOrig": "C1520267010",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1590550415",
      "oldbalanceDest": 2041543.62,
      "newbalanceDest": 19169204.93,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 358831.92,
      "nameOrig": "C908084672",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C392292416",
      "oldbalanceDest": 474384.53,
      "newbalanceDest": 3420103.09,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 367768.4,
      "nameOrig": "C288306765",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1359044626",
      "oldbalanceDest": 370763.1,
      "newbalanceDest": 16518.36,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 209711.11,
      "nameOrig": "C1556867940",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1509514333",
      "oldbalanceDest": 399214.71,
      "newbalanceDest": 2415.16,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 583848.46,
      "nameOrig": "C1839168128",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1286084959",
      "oldbalanceDest": 667778,
      "newbalanceDest": 2107778.11,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 1724887.05,
      "nameOrig": "C1495608502",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1590550415",
      "oldbalanceDest": 3470595.1,
      "newbalanceDest": 19169204.93,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 710544.77,
      "nameOrig": "C835773569",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1359044626",
      "oldbalanceDest": 738531.5,
      "newbalanceDest": 16518.36,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 581294.26,
      "nameOrig": "C843299092",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1590550415",
      "oldbalanceDest": 5195482.15,
      "newbalanceDest": 19169204.93,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "TRANSFER",
      "amount": 11996.58,
      "nameOrig": "C605982374",
      "oldbalanceOrg": 0,
      "newbalanceOrig": 0,
      "nameDest": "C1225616405",
      "oldbalanceDest": 40255,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    },
    {
      "step": 1,
      "type": "PAYMENT",
      "amount": 2875.1,
      "nameOrig": "C1412322831",
      "oldbalanceOrg": 15443,
      "newbalanceOrig": 12567.9,
      "nameDest": "M1651262695",
      "oldbalanceDest": 0,
      "newbalanceDest": 0,
      "isFraud": 0,
      "isFlaggedFraud": 0
    }
  ]
  // const files = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
    },
    scales:{
      scaleOverride: true,
      x:[
        {
          type:"time",
          ticks:{
            stepSize:1000
          }
        }
      ]
    }
  }
  const timestamp = []
  const handleClick = ()=>{
    setSimulating(!simulating)
  }
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/inference`).then((res)=>{
      console.log(res.data)
      const {isFraud} = res.data
      let feature = []
      for(const i of Object.keys(res.data)){
        if(i !== 'isFraud' && i !== 'step'){
          feature = res.data[i]
        }
      }
      // Count number of 0s and 1s in the Class array
      let count0 = 0
      let count1 = 0
      isFraud.forEach((item)=>{
        if(item === 0){
          count0 += 1
        }else{
          count1 += 1
        }
      })
      // Set pie data
      setPieData({
        labels: ['Anomaly', 'Normal'],
        datasets: [
          {
            label: '# of transactions',
            data: [count1,count0],
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
      })
      // Set line data
      // const backgroundColor = []
      // for (let i = 0; i < isFraud.length; i++) {
      //   if(isFraud[i] === 0){
      //     backgroundColor.push('rgba(54, 162, 235)')
      //   }else{
      //     backgroundColor.push('rgba(255, 99, 132)')
      //   }
      // }
      const normal_data = []
      const anomaly_data = []
      if(typeof feature !== 'undefined' && feature.length !== 0){
        for (let i = 0; i < isFraud.length; i++) {
          if(isFraud[i] === 0){
            normal_data.push(feature[i])
          }else{
            anomaly_data.push(feature[i])
          }
        }
      }
      
      for (let i = 0; i < isFraud.length; i++) {
        timestamp.push(i)
      }
      setLineData({
        labels: timestamp,
        datasets: [
          {
            label: 'Anomaly Transactions',
            data: anomaly_data,
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'transparent',
          },
          {
            label: 'Normal Transactions',
            data: normal_data,
            backgroundColor: 'rgba(54, 162, 235)',
            borderColor: 'transparent',
          }
          
        ],
      })
    })
    
    return () => {
    }
  }, [])
  // Fetch train status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${process.env.REACT_APP_API_URL}/train_status`).then((res)=>{
        console.log(res.data)
        if(res.data === "Not Over"){
          setIsTraining(true)
        }else{
          setIsTraining(false)
        }
      })
      if(simulating){
        const index = Math.round(Math.random() * (transactions.length-1))
        const transaction = transactions[index]
        console.log(transaction)
        const body = {
          data: transaction
        }
        axios.post(`${process.env.REACT_APP_API_URL}/upload_list`,body,{
        }).then((res)=>{
          console.log(res.data)
          // Add to the graphs
          setIsTraining(true)
          const dummy = {...transaction}
          dummy["timestamp"] = timestamp.length
          timestamp.push(timestamp.length)  
          dummy["class"] = res.data['pred']
          setTableTransactions((prev)=>{
            return [...prev,dummy]
          })
          
          if(transaction.class === 0){
            setLineData((prev)=>{
              return {
                labels: [...prev.labels,dummy.timestamp],
                datasets: [
                  {
                    label: 'Anomaly Transactions',
                    data: [...prev.datasets[0].data,dummy],
                    backgroundColor: 'rgba(255, 99, 132)',
                    borderColor: 'transparent' },
                  {
                    label: 'Normal Transactions',
                    data: [...prev.datasets[1].data],
                    backgroundColor: 'rgba(54, 162, 235)',
                    borderColor: 'transparent',
                  }
                ],
              }
            })
          }else{
            setLineData((prev)=>{
              return {
                labels: [...prev.labels,dummy.timestamp],
                datasets: [
                  {
                    label: 'Anomaly Transactions',
                    data: [...prev.datasets[0].data],
                    backgroundColor: 'rgba(255, 99, 132)',
                    borderColor: 'transparent'
                  },
                  {
                    label: 'Normal Transactions',
                    data: [...prev.datasets[1].data,dummy],
                    backgroundColor: 'rgba(54, 162, 235)',
                    borderColor: 'transparent',
                  }
                ],
              }
            })
          }
            
        })
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [,simulating]);
  
  return (
    <div className="App">
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen} position="absolute" top="0" right="0">
        API DOC
      </Button>
      <Heading mt={100}>Transaction Anomaly Detection</Heading>
      <Flex width="100%" justifyContent="center" alignItems="center">
        <div style={{margin:"50px"}}>
          <Pie data={piedata} />
        </div>
        <div style={{margin:"50px"}}>
          <Flex marginY="10px" justifyContent="space-around" alignItems="center" paddingY="20px" borderRadius="10px">
            <Text fontWeight="bold" marginRight="20px">Model Status </Text>
            {
              isTraining ? <Badge colorScheme="green">Training</Badge> : <Badge colorScheme="red">Not Training</Badge>
            }
            
          </Flex>
          {/* <section className="container" style={{border:"2px dotted", padding:"20px"}} mY="10px">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop the training data here</p>
            </div>
          </section>

          <Text>{files}</Text>
            <aside>
              <Button mY="10px" onClick={handleUpload}>Upload</Button>
            </aside> */}
        </div>
      </Flex>
      <Flex width="100%" margin="auto" maxW="800px" justifyContent="center" marginBottom="100px" >
        <Line data={lineData} options={options}/>;
      </Flex>
      <Button onClick={handleClick}>{!simulating?"Start":"Stop"} Simulation</Button>
      <TableContainer maxW="700px" margin="auto" marginBottom="50px" maxH="500px" overflowX="scroll" overflowY="scroll">
        <Table variant='simple'>
          <TableCaption>Transactions</TableCaption>
          <Thead>
            <Tr>
              <Th>Timestamp</Th>
              {
                transactions[0] && Object.keys(transactions[0]).map((key, index) => {
                  return <Th key={index}>{key}</Th>
                })
              }
            </Tr>
          </Thead>
          <Tbody>
            {
              tableTransactions?.map((transaction, index) => {
                return <Tr key={index} backgroundColor={transaction.class===0?'rgba(54, 162, 235)':'rgba(255, 99, 132)'}>
                  <Td>{transaction.timestamp}</Td>
                  {
                    Object.keys(transaction).slice(0,(Object.keys(transaction)).length-2).map((key, index) => {
                      return <Td key={index}>{transaction[key]}</Td>
                    })
                  }
                </Tr>
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>DOCUMENTATION</DrawerHeader>

          <DrawerBody>
            {/* <Input placeholder='Type here...' /> */}
            {/* API documentation with endpoints and functionalities */}
            <Text fontWeight="bold">GET /inference</Text>
            <Text>Get the inference result</Text>
            <Text fontWeight="bold">GET /train_status</Text>
            <Text>Get the training status</Text>
            <Text fontWeight="bold">POST /upload_list</Text>
            <Text>Upload a list of transactions</Text>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default App;
