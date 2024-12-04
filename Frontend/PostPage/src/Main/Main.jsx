import React from 'react'
import Img from './imgSymbol2.jpg'
import Map from './map.png'

const Main = () => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '40vw', display: 'inline-block' }}>
            <h1>Naziv događaja</h1>
            <div style={{height: '28vw', display: 'block', wordWrap: 'break-word', overflowY: 'scroll'}}><p>
                Opis dogadjaja. aaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p></div>
            <div style={{width: '40vw', height: '5vw', display: 'flex', marginTop: '6px' }}>
                <button style={{ width: '30%', height: '100%' }}>Nazad</button>
                <button style={{ width: '50%', height: '100%', marginLeft: 'auto' }}>Uključi</button>
            </div>
        </div>
        <div  style={{width: '60vw'}}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1%', marginBottom: '2%' }}>
                <img src={Img} style={{ width: 'auto', height: '58vh' }} />
            </div>
            <div style={{display: 'flex', width: '100%'}}>
                <div style={{marginLeft: '5%', marginTop: '2%', width: '30%'}}>
                    <span style={{ display: 'block', border: '1px solid black', padding: '15px', marginBottom: '10px' }}>lokacija</span>
                    <span style={{ display: 'block', padding: '15px', border: '1px solid black', }}>vreme</span>
                </div>
                <img src={Map} style={{width: 'auto', height: '30vh' ,marginLeft: 'auto', marginRight: '5%'}}/>
            </div>
        </div>
    </div>
  )
}

export default Main