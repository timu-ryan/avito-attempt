import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CaretLeftOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Spin, Modal, Image, Button } from 'antd';
import api from '../utils/api';


const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentGame, setCurrentGame] = useState({
    thumbnail: '',
    screenshots: [],
    release_date: '',
    publisher: '',
    developer: '',
    genre: '',
    minimum_system_requirements: {os: ''}
  })
  const [isLoading, setIsLoading] = useState(false)

  const setToLocalStorage = (item) => {
    localStorage.setItem(item.id, JSON.stringify(item));
    setTimeout(() => {
      localStorage.removeItem(item.id);
    }, 300000);
  }

  useEffect(() => {
    setIsLoading(true)
    if(localStorage.getItem(id)) {
      setCurrentGame(JSON.parse(localStorage.getItem(id)));
      setIsLoading(false)
    } else {
      api.getSpecificGame(id)
        .then(res => {
          setCurrentGame(res);
          setToLocalStorage(res);
          return res;
        })
        .catch(err => {
          console.log(err);
          setIsModalOpen(true);
        })
        .finally(res => setIsLoading(false))
    }
  }, []);

  const handleBackClick = () => {
    navigate('/')
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <Spin spinning={isLoading} />
      <Button 
        type="default" 
        shape="circle" 
        icon={<CaretLeftOutlined />} 
        size='middle' 
        onClick={handleBackClick} 
      />
      <h1>{currentGame.title}</h1>
      <Image
        width={500}
        src={currentGame.thumbnail}
      />
      <p>фотогалерея скриншотов: </p>
      <Image.PreviewGroup
        items={currentGame.screenshots.map(game => game.image)}
      >
        <Image
          width={200}
          src={currentGame.thumbnail}
        />
      </Image.PreviewGroup>
      <ul>
        <li>{currentGame.release_date}</li>
        <li>{currentGame.publisher}</li>
        <li>{currentGame.developer}</li>
        <li>{currentGame.genre}</li>
      </ul>
      <p>минимальные системные требования:</p>
      <p>к сожалению, мы сейчас не можем предоставить системные требования</p>
      {/* не получилось получить доступ к системным требованиям */}
      <p>{currentGame.description}</p>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>К сожалению произвести запрос на серевер не удалось, попробуйте позже</p>
      </Modal>
    </>
  )
}

export default GamePage