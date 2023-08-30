import './App.css';
import api from '../api';
import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { Layout } from 'antd';
import { Spin } from 'antd';

import SelectForm from './SelectForm';
import { Routes, Route } from 'react-router-dom';
import GamePage from './GamePage';
import { Link } from 'react-router-dom';

function App() {
  const [cardList, setCardList] = useState([])
  const { Meta } = Card;
  const {Header, Content, Footer} = Layout;

  // const [currentGame, setCurrentGame] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    api.getGamesList()
      .then(cardList => {
        setCardList(cardList)
        console.log(cardList)
      })
      .catch(err => console.log(`error: ${err}`))
      .finally(() => setIsLoading(false))
  }, []);

  const handleSearchSubmit = (formValue) => {
    setIsLoading(true)
    api.getSelectedCards(formValue)
      .then(res => {
        setCardList(res)
      })
      .catch(err => console.log(err))
      .finally(setIsLoading(false))
  }

  // const handleCardClick = (e) => {
  //   // api.getSpecificGame(42)
  //   //   .then(res => console.log(res))
  //   console.log(e.target.parentNode.parentNode.parentNode)
  // }
  // handleCardClick();
  const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
  };
  return (
    <div className="App">

      <Layout>
        <Header style={headerStyle}>freetogame</Header>
        <Routes>
          <Route path="/" element={
            <Content>
              <Spin spinning={isLoading} />
              <SelectForm onSearch={handleSearchSubmit} />
              <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="space-evenly">
                {cardList.length 
                  ? cardList.map(card => {
                    return (
                      <Col span={{ xs: 24, sm: 12, md: 8, lg: 8 }} key={card.id}>
                        <Link to={`games/${card.id}`}>
                          <Card
                            hoverable
                            style={{
                              width: 300,
                              height: 350,
                            }}
                            cover={<img alt={card.title} src={card.thumbnail} />}
                          >
                            <Meta title={card.title} />
                            <p>{card.release_date}</p>
                            <p>{card.genre}</p>
                            <p>{card.publisher}</p>
                          </Card>
                        </Link>
                      </Col>
                    )
                  })
                  : 'No results available at the moment, please try again later.'}
              </Row>
            </Content>} />
          <Route path="/games/:id" element={<GamePage />}/>  
          {/* <Route path="/game/2" element={<Game serverData={serverData}/>}/>   */}
        </Routes>
        
        <Footer>Благодарим FreeToGame.com за предоставленное API</Footer>
      </Layout>
      
    </div>
  );
}

export default App;
