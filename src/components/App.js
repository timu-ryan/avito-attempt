import api from '../utils/api';
import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Spin } from 'antd';
import { Navigate } from 'react-router-dom';

import SelectForm from './SelectForm';
import { Routes, Route } from 'react-router-dom';
import GamePage from './GamePage';
import GamesSection from './GamesSection';
import { Modal } from 'antd';

function App() {
  const [cardList, setCardList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {Header, Content, Footer} = Layout;

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
      .catch(err => {
        console.log(err);
        setIsModalOpen(true);
      })
      .finally(setIsLoading(false))
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Layout style={{minHeight: "100vh"}}>
        <Header className='header'>freetogame</Header>
        <Routes>
          <Route path="/" element={
            <Content>
              <Spin spinning={isLoading} />
              <SelectForm onSearch={handleSearchSubmit} />
              <GamesSection cardList={cardList} />
              <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>К сожалению произвести запрос на серевер не удалось, попробуйте позже</p>
              </Modal>
            </Content>} />
          <Route path="/games/:id" element={<GamePage />}/>  
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
        
        <Footer>Благодарим FreeToGame.com за предоставленное API</Footer>
      </Layout>
    </div>
  );
}

export default App;
