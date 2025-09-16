import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard(){
  const [summary,setSummary] = useState(null)
  const [dark,setDark] = useState(()=> localStorage.getItem('theme') === 'dark')

  useEffect(()=>{
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  },[dark])

  useEffect(()=>{
    axios.get('/api/reports/summary').then(r=>setSummary(r.data)).catch(()=>setSummary(null))
  },[])

  if(!summary) return <div className='centerCard'><p>Carregando resumo...</p></div>

  const data = {
    labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    datasets: [{ label: 'Inadimplência (nº títulos)', data: summary.monthly_default, tension:0.4 }]
  }

  return (
    <div style={{padding:20}}>
      <div className="topActions">
        <h1>Resumo</h1>
        <div>
          <button className="btn ghost" onClick={()=>setDark(d=>!d)}>Alternar tema</button>
        </div>
      </div>
      <div className="grid">
        <div className="card">
          <h3>Total de Devedores</h3>
          <div className="big">{summary.total_debtors}</div>
        </div>
        <div className="card">
          <h3>Total de Credores</h3>
          <div className="big">{summary.total_creditors}</div>
        </div>
        <div className="card">
          <h3>Valor em Aberto</h3>
          <div className="big">R$ {summary.total_open_amount.toLocaleString(undefined,{minimumFractionDigits:2})}</div>
        </div>
        <div className="card">
          <h3>Recebido</h3>
          <div className="big">R$ {summary.total_received.toLocaleString(undefined,{minimumFractionDigits:2})}</div>
        </div>
      </div>
      <div className="card" style={{marginTop:16}}>
        <h3>Inadimplência por mês</h3>
        <Line data={data} />
      </div>
    </div>
  )
}
