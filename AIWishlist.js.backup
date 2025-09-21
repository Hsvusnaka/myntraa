import React, { useState } from 'react';
import ImageCard from './ImageCard';

const css = `
.page-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
}

h3 {
    text-align: center;
    font-size: 25px;
    margin-top: 10px;
}
    h4{
    font-size: 18px;
    margin-top:8px;
    margin-bottom:20px;
    }
`;

const dummyClothesData = [
    {
        name: 'T-Shirt',
        images: [
            'https://static.aceomni.cmsaceturtle.com/prod%2Fproduct-image%2Faceomni%2FWrangler%2FMyntra%2FWWTS001119%2FWWTS001119_1.jpg'
        ]
    },
    {
        name: 'Jeans',
        images: [
            'https://www.sassafras.in/cdn/shop/products/SFJEAN0249-2_4eda273c-02d4-4740-bffc-28d5182af8ed_1080x.jpg?v=1672295142'
        ]
    },
    {
        name: 'Jacket',
        images: [
            "https://img.etimg.com/photo/msid-96169788,imgsize-48504/AtoZCreationWomen'sSolidJacket.jpg"
        ]
    },
    {
        name: 'Dress',
        images: [
            'https://assets.ajio.com/medias/sys_master/root/20240406/jTor/6610dc8616fd2c6e6aa17c06/-473Wx593H-466855053-yellow-MODEL.jpg'
        ]
    },
    {
        name: 'Skirt',
        images: [
            'https://5.imimg.com/data5/SELLER/Default/2021/3/JM/CB/WR/100778184/women-shirt-and-printed-skirt.jpg'
        ]
    },
    {
        name: 'Sweater',
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBdagBJXVsdIaEEwgM335rd67QrUuGkk71Dg&s'
        ]
    },
    {
        name: 'Shorts',
        images: [
            'https://assets.ajio.com/medias/sys_master/root/20230628/qNhw/649b4ebeeebac147fc0f20a4/-473Wx593H-465607946-white-MODEL.jpg'
        ]
    },
];

const AIWishlist = () => {
    const [clothes, setClothes] = useState(dummyClothesData);

    const handleAdd = (item) => {
        console.log('Added:', item);
    };

    const handleRemove = (item) => {
        console.log('Removed:', item);
    };

    return (
        <div className="page-container">
            <style>{css}</style>
            <div className='container'>
            <h3 className='header font1 font-light'>Trendy collections, handpicked just for you.</h3>
            <h4 className='header font1'>Based on your search history</h4>
            </div>
            {clothes.map((item, index) => (
                <ImageCard
                    key={index}
                    item={item}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                />
            ))}
        </div>
    );
};

export default AIWishlist;
