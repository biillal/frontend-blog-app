import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './post.css'
function PostItems({ posts , username , userId}) {
    const profileLink = userId ?  `/profile/${userId}` : `/profile/${posts.user._id}`
    return (
        <Card className="card">
            <Card.Img variant="top" style={{ width: "90%", marginLeft: '45px', marginTop: '10px', height: '450px' }} src={posts.image.url} />
            <Card.Body>
                <Card.Text className='bord' style={{ display: 'flex', justifyContent: "space-between", width: '93%', marginLeft: "23px" }}>
                    <div>
                        <span>author : </span>
                        <Link to={profileLink}>{username ? username : posts.user.username} </Link>
                        
                    </div>
                    <div className='date'>
                        {posts.createdAt}
                    </div>
                </Card.Text>
                <div className='title1'>
                    <Card.Title>{posts.title}</Card.Title>
                    <Link to={`/posts/categories/${posts.category}`}><Button variant="primary">{posts.category}</Button></Link>
                </div>
                <Card.Text style={{ width: '95%' }} className="desc">
                    {posts.description}
                    uidbazubzauidbazuibdazuibdauibduiNDIZANOINDOIAZNDIAZDIOAZNIOA
                    abdauibauibdzabiudzabdbauidbazibdazbdz
                    uiabdiuzabdzabuidbzauibdzauibuibduizabdabbduizabdazbuidbazbdzaubdzauibdzaui
                    dazubiuzadbuiazbduazibduzaibduiazdbuazibazudba
                    iazdbazuidbazidazubaz
                </Card.Text>
                <Link to={`/posts/details/${posts._id}`}>
                    <Button className='btn1' variant="primary">Read more..</Button>
                </Link>

            </Card.Body>
        </Card>
    )
}

export default PostItems
