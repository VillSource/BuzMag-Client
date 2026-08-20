import React from 'react'
import { useParams } from '@tanstack/react-router'

const PingPage: React.FC = () => {
  const { name } = useParams({ from: '/ping/$name' })

  return (
    <div>
      <h2>Ping</h2>
      <p>Name: {name}</p>
    </div>
  )
}

export default PingPage
