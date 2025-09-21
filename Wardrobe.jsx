import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const css = `
.wardrobe {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 20px;
}

.clothes-flex {
    display: flex;
    flex-direction:row;
    justify-content: space-around;
    align-items:space-around;
    padding: 20px;
}

.clothes-item {
    margin-left:20px;
    margin-right:20px;
    height:340px;
    width:230px;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
    padding: 10px;
}

.clothes-item:hover {
    transform: translateY(-10px);
}

.clothes-image {
    width: 210px;
    height: 210px ;
    object-fit:cover;

}

.clothes-info {
    text-align: center;
    margin-top: 10px;
}

.clothes-name {
    font-size: 18px;
    margin: 10px 0;
}

.view-button {
    padding: 5px 15px;
    background-color: #fa688b;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 5px;
}

.view-button:hover {
    background-color: #e01e50;
}
`

const dummyClothesData = [
    {
        name: 'T-Shirt',
        images: [
            'https://static.fibre2fashion.com/MemberResources/LeadResources/1/2018/9/Seller/18154533/Images/18154533_0_ladies-stylish-t-shirt.jpg',
            'https://static.aceomni.cmsaceturtle.com/prod%2Fproduct-image%2Faceomni%2FWrangler%2FMyntra%2FWWTS001119%2FWWTS001119_1.jpg',
            'https://images.meesho.com/images/products/5319661/5kdad_512.jpg',
            'https://assets.ajio.com/medias/sys_master/root/20230623/XFwt/64953e3242f9e729d78e55f9/-473Wx593H-464860268-multi-MODEL.jpg'
        ]
    },
    {
        name: 'Jeans',
        images: [
            'https://www.sassafras.in/cdn/shop/products/SFJEAN0249-2_4eda273c-02d4-4740-bffc-28d5182af8ed_1080x.jpg?v=1672295142',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJBv223Ee96L9WEgt_YET_NBJrUy0BSPNxA&s',
            'https://rukminim2.flixcart.com/image/850/1000/l2qhjm80/jean/m/g/b/s-27629-urbanic-original-imageypexpdy7fmt.jpeg?q=90&crop=false',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBYSCQD39DkQe22TSQD7vhKHPxkt3Icjcb5w&shttps://images.meesho.com/images/products/370177303/ryau5_512.webp'
        ]
    },
    {
        name: 'Jacket',
        images: [
            'https://img.etimg.com/thumb/width-1200,height-900,imgsize-71512,resizemode-75,msid-96550124/top-trending-products/lifestyle/best-biker-jackets-for-women-in-india.jpg',
            'https://m.media-amazon.com/images/I/913sL+OvALL._AC_UY1100_.jpg',
            "https://img.etimg.com/photo/msid-96169788,imgsize-48504/AtoZCreationWomen'sSolidJacket.jpg",
            'https://www.calvinklein.com.sg/dw/image/v2/BGLQ_PRD/on/demandware.static/-/Sites-ck-master-catalog/default/dw916238e9/J223340/C25_01_J223340BEH_MO-ST-F1.jpg?sw=548&sh=685&q=90'
        ]
    },
    {
        name: 'Dress',
        images: [
            'https://assets.ajio.com/medias/sys_master/root/20240406/jTor/6610dc8616fd2c6e6aa17c06/-473Wx593H-466855053-yellow-MODEL.jpg',
            'https://assets.ajio.com/medias/sys_master/root/20230620/BVTA/6491ea0fd55b7d0c637ce77b/-473Wx593H-463086147-blue-MODEL.jpg',
            'https://www.jiomart.com/images/product/original/rvdzamkamb/fabflee-women-multicolor-printed-rayon-a-line-dress-navy-product-images-rvdzamkamb-4-202301091112.jpg?im=Resize=(500,630)',
            'https://img.faballey.com/images/Product/ILK00197Z/d3.jpg'
        ]
    },
    {
        name: 'Skirt',
        images: [
            'https://5.imimg.com/data5/SELLER/Default/2021/3/JM/CB/WR/100778184/women-shirt-and-printed-skirt.jpg',
            'https://images.meesho.com/images/products/109307495/upoqh_512.webp',
            'https://assets.ajio.com/medias/sys_master/root/20240207/kJli/65c305f516fd2c6e6ae1edfe/-473Wx593H-467039652-green-MODEL.jpg',
            'https://arimonz.com/cdn/shop/products/New-High-Waist-Denim-Skirt-Streetwear-A-Line-Long-Skirts-For-Women-Big-Swing-Single-Breasted_800x.jpg?v=1640780817'
        ]
    },
    {
        name: 'Sweater',
        images: [
            'https://m.media-amazon.com/images/I/71PIJ0FXJ3L._AC_UY1100_.jpg',
            'https://street9.com/cdn/shop/products/SWT00008673_1.jpg?v=16968612532',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBdagBJXVsdIaEEwgM335rd67QrUuGkk71Dg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8A9fBCyrsyHy3QBHFeClJsVZ0qZo1s0Vmrw&s'
        ]
    },
    {
        name: 'Shorts',
        images: [
            'https://i.pinimg.com/564x/1f/0b/86/1f0b86bf31289b40c46ced41c02066a8.jpg',
            'https://cdn.pixelspray.io/v2/black-bread-289bfa/woTKH5/wrkr/t.resize(h:1000,w:820)/data/Superdry/20042023/410381280005_1.jpg',
            'https://assets.ajio.com/medias/sys_master/root/20230628/qNhw/649b4ebeeebac147fc0f20a4/-473Wx593H-465607946-white-MODEL.jpg',
        ]
    },
];

const AIWardrobe = () => {
    const [clothes, setClothes] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const keyword = query.get('keyword');

        if (keyword) {
            fetchClothes(keyword);
        }
    }, [location]);

    const fetchClothes = (keyword) => {
        const filteredClothes = dummyClothesData.filter(item =>
            item.name.toLowerCase().includes(keyword.toLowerCase())
        );
        const recommendations = filteredClothes.slice(0, 4); 
        setClothes(recommendations);
    };

    return (
        <>
            <style>{css}</style>
            <div className="wardrobe">
                {clothes.length > 0 ? (
                    <div className="clothes-flex">
                        {clothes.map((item, index) => (
                            item.images.map((image, idx) => (
                                <div key={`${index}-${idx}`} className="clothes-item">
                                    <img src={image} alt={`${item.name} ${idx + 1}`} className="clothes-image" height={"200px"} width={"200px"} />
                                    <div className="clothes-info">
                                        <p className="clothes-name">{`${item.name} ${idx + 1}`}</p>
                                        <button className="view-button font1">View</button>
                                    </div>
                                </div>
                            ))
                        ))}
                    </div>
                ) : (
                    <p>No clothes found for the search term.</p>
                )}
            </div>
        </>
    );
};

export default AIWardrobe;