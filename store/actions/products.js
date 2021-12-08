import { useDispatch } from "react-redux";
import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        // any async code you want!
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                'https://rn-database-9b245-default-rtdb.europe-west1.firebasedatabase.app/products.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');  //serverda hata olabilir yada server 400 500 satır koddan sonrasını kaldırmayabilir 
            }                                               //dolayısıyla try catch e aldık ki hata olursa uygulama çökmesin

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    )
                );

            }

            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            });
        } catch (err) {
            //send to custom analitik server 
            throw err;
        }
    };
};


export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://rn-database-9b245-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json?auth=${token}`,  //${} this is vanilla js
            {
                method: 'DELETE',
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({
            type: DELETE_PRODUCT, pid: productId
        });
    };

};

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        //any async code you want
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-database-9b245-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`, {   // products.json bu sadece firebase için spesific birşey
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            })
        });
        

        const resData = await response.json();
        


        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title: title,
                description: description,
                imageUrl, //js 'le ayniysa bu şekilde de yazılabiliyor
                price,
                ownerId: userId
            }
        });
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {  //normalde burdan store dan veri çekemiyorum ama redux thunk ile getState ile çekebildim
        const token = getState().auth.token;
        const response = await fetch(
            `https://rn-database-9b245-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${token}`, //not '' its ``
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                })
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                description,
                imageUrl
            }
        });
    };

};