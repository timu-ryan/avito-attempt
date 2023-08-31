import React from 'react'
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';

const GamesSection = ({ cardList }) => {
  const { Meta } = Card;

  return (
    <Row style={{maxWidth: 1350}} gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="space-evenly">
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
  )
}

export default GamesSection