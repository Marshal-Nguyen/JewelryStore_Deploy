

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateProduct() {
    const [isYesNoOpen, setIsYesNoOpen] = useState(false);
    const [formData, setFormData] = useState({
        CategoryId: '',
        Name: '',
        MaterialCost: 0,
        ProductionCost: '',
        GemCost: 0,
        PriceRate: '',
        ImgFile: null,
    });

    const [diamondData, setDiamondData] = useState({
        originId: '',
        shapeId: '',
        fluorescenceId: '',
        colorId: '',
        symmetryId: '',
        polishId: '',
        cutId: '',
        clarityId: '',
        caratId: '',
        diamondGradingCode: '',
    });

    const [createdProduct, setCreatedProduct] = useState(null);
    const [createdDiamond, setCreatedDiamond] = useState(null);
    const [createdRetailGold1, setCreatedRetailGold1] = useState(null);
    const [createdRetailGold, setCreatedRetailGold] = useState({
        materialId: '',
        weight: '',

    });
    const [imagePreview, setImagePreview] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const [categoryType, setCategoryType] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [originOptions, setOriginOptions] = useState([]);
    const [shapeOptions, setShapeOptions] = useState([]);
    const [fluorescenceOptions, setFluorescenceOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const [symmetryOptions, setSymmetryOptions] = useState([]);
    const [polishOptions, setPolishOptions] = useState([]);
    const [cutOptions, setCutOptions] = useState([]);
    const [clarityOptions, setClarityOptions] = useState([]);
    const [caratOptions, setCaratOptions] = useState([]);
    const [materialOptions, setMaterialOptions] = useState([]);
    const [done1, setDone1] = useState(true);
    const [done, setDone] = useState(true);
    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        try {
            const materialResponse = await axios.get(
                'https://jssatsproject.azurewebsites.net/api/Material/getall'
            );
            setMaterialOptions(materialResponse.data.data);

            const categoryResponse = await axios.get(
                'https://jssatsproject.azurewebsites.net/api/productcategory/getall'
            );
            setCategoryOptions(categoryResponse.data.data);

            const originResponse = await axios.get(
                'https://jssatsproject.azurewebsites.net/api/Origin/GetAll'
            );
            setOriginOptions(originResponse.data.data);

            const shapeResponse = await axios.get(
                'https://jssatsproject.azurewebsites.net/api/Shape/GetAll'
            );
            setShapeOptions(shapeResponse.data.data);

            const fluorescenceResponse = await axios.get(
                'https://jssatsproject.azurewebsites.net/api/fluorescence/GetAll'
            );
            setFluorescenceOptions(fluorescenceResponse.data.data);

            const colorResponse = await axios.get(
                'https://jssatsproject.azurewebsites.net/api/_4C/GetColorAll'
            );
            setColorOptions(colorResponse.data.data);

            const symmetryResponse = await axios.get(
                'https://jssatsproject.azurewebsites.net/api/Symmetry/GetAll'
            );
            setSymmetryOptions(symmetryResponse.data.data);

            const polishResponse = await axios.get(
                'https://jssatsproject.azurewebsites.net/api/Polish/GetAll'
            );
            setPolishOptions(polishResponse.data.data);

            const cutResponse = await axios.get(
                'https://jssatsproject.azurewebsites.net/api/_4C/getCutAll'
            );
            setCutOptions(cutResponse.data.data);

            const clarityResponse = await axios.get(
                'https://jssatsproject.azurewebsites.net/api/_4C/GetClarityAll'
            );
            setClarityOptions(clarityResponse.data.data);

            const caratResponse = await axios.get(
                'https://jssatsproject.azurewebsites.net/api/_4C/getCaratAll'
            );
            setCaratOptions(caratResponse.data.data);

        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'ImgFile') {
            const file = files[0];

            if (file && file.type.startsWith('image/')) {
                setFormData({
                    ...formData,
                    [name]: file,
                });
                setImagePreview(URL.createObjectURL(file));
            } else {
                alert('Please select a valid image file.');
                setImagePreview(null);
            }
        } else if (name === 'CategoryId') {
            setFormData({
                ...formData,
                [name]: value,
            });
            setCategoryType(value)
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleDiamondChange = (e) => {
        const { name, value } = e.target;
        setDiamondData({
            ...diamondData,
            [name]: value,
        });
    };
    const handleRetailGoldChange = (e) => {
        const { name, value } = e.target;
        setCreatedRetailGold({
            ...createdRetailGold,
            [name]: value,
        });
    };

    const handleSubmitProduct = async () => {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await axios.post(
                'https://jssatsproject.azurewebsites.net/api/product/createProduct',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Product created successfully:', response.data);
            setCreatedProduct(response.data.data);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleSubmitDiamond = async () => {
        try {
            const response = await axios.post(
                'https://jssatsproject.azurewebsites.net/api/Diamond/createDiamond',
                diamondData
            );
            console.log('Diamond created successfully:', response.data);
            setCreatedDiamond(response.data.data);
        } catch (error) {
            console.error('Error creating diamond:', error);
        }
    };

    const handleCreateProductDiamond = async () => {
        if (createdProduct && createdDiamond) {
            const productDiamondData = {
                productId: createdProduct.id,
                diamondId: createdDiamond.id,
            };

            try {
                const response = await axios.post(
                    'https://jssatsproject.azurewebsites.net/api/ProductDiamond/Create',
                    productDiamondData
                );
                console.log('ProductDiamond created successfully:', response.data);
                toast.success('Create product diamond success !')
            } catch (error) {
                console.error('Error creating ProductDiamond:', error);
            }
        }
    };
    useEffect(() => {
        handleCreateProductDiamond();
    }, [createdDiamond, createdProduct]);
    const handleCreateRetailGold = async () => {
        setCreatedRetailGold1(createdRetailGold);
        console.log('setCreatedRetailGold', createdRetailGold);
        console.log('setCreatedRetailGold1', createdRetailGold1);



    };
    const handleCreateProductRetailGold = async () => {
        if (createdProduct && createdRetailGold1) {
            const productRetailGoldData = {
                productId: createdProduct.id,
                weight: createdRetailGold1.weight,
                materialId: createdRetailGold1.materialId,
            };

            try {
                const response = await axios.post(
                    'https://jssatsproject.azurewebsites.net/api/ProductMaterial/create',
                    productRetailGoldData
                );
                console.log('Product Retail gold created successfully:', response.data);
                toast.success('Create product retail gold success !')

            } catch (error) {
                console.error('Error creating ProductDiamond:', error);
            }
        }
        // console.log('setCreatedReta1111ilGold1', createdProduct);
    };
    useEffect(() => {
        handleCreateProductRetailGold();
    }, [createdRetailGold1, createdProduct]);


    const handleChangeDone1 = async (e) => {
        e.preventDefault();
        setDone1(!done1)
    }
    const isSaveEnabled = () => {
        // Kiểm tra điều kiện tất cả các thuộc tính của formData và diamondData
        for (const key in formData) {
            if (formData[key] === '' || formData[key] === null) {
                return false;
            }
        }
        if (categoryType === '7') {
            for (const key in diamondData) {
                if (diamondData[key] === '' || diamondData[key] === null) {
                    return false;
                }
            }
        } else if (categoryType === '5') {
            for (const key in createdRetailGold) {
                if (createdRetailGold[key] === '' || createdRetailGold[key] === null) {
                    return false;
                }
            }
        }

        return true;
    };
    const handleYesNo = () => {
        setIsYesNoOpen(true);
    };
    const resetData = () => {
        setFormData({
            CategoryId: categoryType,
            Name: '',
            MaterialCost: 0,
            ProductionCost: '',
            GemCost: 0,
            PriceRate: '',
            ImgFile: null,
        });

        setDiamondData({
            originId: '',
            shapeId: '',
            fluorescenceId: '',
            colorId: '',
            symmetryId: '',
            polishId: '',
            cutId: '',
            clarityId: '',
            caratId: '',
            diamondGradingCode: '',
        });

        setCreatedProduct(null);
        setCreatedDiamond(null);
        setCreatedRetailGold1(null);
        setCreatedRetailGold({
            materialId: '',
            weight: '',
        });
    }
    useEffect(() => {
        resetData();
    }, [categoryType]);
    const handleBack = () => {
        navigate(-1); // Quay lại trang trước đó
    };
    return (
        <div className="p-4 max-w-[1200px] mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-3xl font-bold text-blue-800">Create New Product</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-md">
                    {done1 ? (
                        <form onSubmit={handleChangeDone1} className="space-y-4">
                            <div className="">
                                <div className="flex items-center py-4">
                                    <label htmlFor="CategoryId" className="block text-sm font-bold text-black mr-2">
                                        Category :
                                    </label>
                                    <select
                                        id="CategoryId"
                                        name="CategoryId"
                                        value={formData.CategoryId}
                                        onChange={handleChange}
                                        className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                    >
                                        <option value="">Select Category</option>
                                        {categoryOptions.map((categoryIndex) => (
                                            <option key={categoryIndex.id} value={categoryIndex.id}>
                                                {categoryIndex.name}
                                            </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="flex items-center py-4">
                                    <label htmlFor="Name" className="block text-sm font-bold text-black mr-2">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="Name"
                                        value={formData.Name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                    />
                                </div>
                                <div className="flex items-center py-4">
                                    <label htmlFor="ProductionCost" className="block text-sm font-bold text-black mr-2">
                                        Production Cost:
                                    </label>
                                    <input
                                        type="number"
                                        name="ProductionCost"
                                        step="0.001"
                                        min="1000"
                                        max="99000000"
                                        value={formData.ProductionCost}
                                        onChange={handleChange}
                                        placeholder="Production Cost"
                                        className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                    />
                                </div>
                                {/* <div>{categoryType}</div> */}
                                {categoryType !== '7' && categoryType !== '5' && (
                                    <>
                                        <div className="flex items-center py-4">
                                            <label htmlFor="MaterialCost" className="block text-sm font-bold text-black mr-2">
                                                Material Cost:
                                            </label>
                                            <input
                                                type="number"
                                                name="MaterialCost"
                                                step="0.001"
                                                min="0"
                                                max="99000000"
                                                value={formData.MaterialCost}
                                                onChange={handleChange}
                                                placeholder="Material Cost"
                                                className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                            />
                                        </div>
                                        <div className="flex items-center py-4">
                                            <label htmlFor="GemCost" className="block text-sm font-bold text-black mr-2">
                                                Gem Cost:
                                            </label>
                                            <input
                                                type="number"
                                                name="GemCost"
                                                step="0.001"
                                                min="0"
                                                max="99000000"
                                                value={formData.GemCost}
                                                onChange={handleChange}
                                                placeholder="Gem Cost"
                                                className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="flex items-center py-4">
                                    <label htmlFor="PriceRate" className="block text-sm font-bold text-black mr-2">
                                        Price Rate:
                                    </label>
                                    <input
                                        type="number"
                                        name="PriceRate"
                                        step="0.001"
                                        min="0"
                                        max="5"
                                        value={formData.PriceRate}
                                        onChange={handleChange}
                                        placeholder="Price Rate"
                                        className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                    />
                                </div>

                                <div className="flex items-center py-4">
                                    <label htmlFor="ImgFile" className="block text-sm font-bold text-black mr-2">
                                        Image File:
                                    </label>
                                    <input
                                        type="file"
                                        name="ImgFile"
                                        onChange={handleChange}
                                        className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                    />
                                </div>

                                {imagePreview && (
                                    <div className="flex items-center">
                                        <img
                                            src={imagePreview}
                                            alt="Selected"
                                            className="mt-2 mx-auto w-50 h-auto object-cover shadow-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Next
                            </button>
                        </form>
                    ) : categoryType === '5'
                        ? (<form onSubmit={handleChangeDone1} className=" space-y-4">
                            <div>
                                <div className="flex items-center py-2">
                                    <label htmlFor="materialId" className="block text-sm font-bold text-black mr-2">
                                        Material Id:
                                    </label>
                                    <select
                                        name="materialId"
                                        value={createdRetailGold.materialId}
                                        onChange={handleRetailGoldChange}
                                        className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                    >
                                        <option value="">Select Material</option>
                                        {materialOptions.map((material) => (
                                            <option key={material.id} value={material.id}>
                                                {material.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center py-2">
                                    <label htmlFor="weight" className="block text-sm font-bold text-black mr-2">
                                        Weight:
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        step="0.001"
                                        min="0.001"
                                        max="50"
                                        value={createdRetailGold.weight}
                                        onChange={handleRetailGoldChange}
                                        placeholder="Production Cost"
                                        className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                    />
                                </div>


                            </div>
                            <button
                                type="submit"
                                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Back
                            </button>

                        </form>)
                        : (
                            <form onSubmit={handleChangeDone1} className=" space-y-4">
                                <div>
                                    <div className="flex items-center py-2">
                                        <label htmlFor="originId" className="block text-sm font-bold text-black mr-2">
                                            Origin:
                                        </label>
                                        <select
                                            name="originId"
                                            value={diamondData.originId}
                                            onChange={handleDiamondChange}
                                            className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                        >
                                            <option value="">Select Origin</option>
                                            {originOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <label htmlFor="shapeId" className="block text-sm font-bold text-black mr-2">
                                            Shape:
                                        </label>
                                        <select
                                            name="shapeId"
                                            value={diamondData.shapeId}
                                            onChange={handleDiamondChange}
                                            className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto ml-auto"
                                        >
                                            <option value="">Select Shape</option>
                                            {shapeOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <label htmlFor="fluorescenceId" className="block text-sm font-bold text-black mr-2">
                                            Fluorescence:
                                        </label>
                                        <select
                                            name="fluorescenceId"
                                            value={diamondData.fluorescenceId}
                                            onChange={handleDiamondChange}
                                            className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                        >
                                            <option value="">Select Fluorescence</option>
                                            {fluorescenceOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.level}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <label htmlFor="colorId" className="block text-sm font-bold text-black mr-2">
                                            Color:
                                        </label>
                                        <select
                                            name="colorId"
                                            value={diamondData.colorId}
                                            onChange={handleDiamondChange}
                                            className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                        >
                                            <option value="">Select Color</option>
                                            {colorOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <label htmlFor="symmetryId" className="block text-sm font-bold text-black mr-2">
                                            Symmetry:
                                        </label>
                                        <select
                                            name="symmetryId"
                                            value={diamondData.symmetryId}
                                            onChange={handleDiamondChange}
                                            className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                        >
                                            <option value="">Select Symmetry</option>
                                            {symmetryOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.level}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <label htmlFor="polishId" className="block text-sm font-bold text-black mr-2">
                                            Polish:
                                        </label>
                                        <select
                                            name="polishId"
                                            value={diamondData.polishId}
                                            onChange={handleDiamondChange}
                                            className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                        >
                                            <option value="">Select Polish</option>
                                            {polishOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.level}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <label htmlFor="cutId" className="block text-sm font-bold text-black mr-2">
                                            Cut:
                                        </label>
                                        <select
                                            name="cutId"
                                            value={diamondData.cutId}
                                            onChange={handleDiamondChange}
                                            className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                        >
                                            <option value="">Select Cut</option>
                                            {cutOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.level}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <label htmlFor="clarityId" className="block text-sm font-bold text-black mr-2">
                                            Clarity:
                                        </label>
                                        <select
                                            name="clarityId"
                                            value={diamondData.clarityId}
                                            onChange={handleDiamondChange}
                                            className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                        >
                                            <option value="">Select Clarity</option>
                                            {clarityOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.level}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <label htmlFor="caratId" className="block text-sm font-bold text-black mr-2">
                                            Carat:
                                        </label>
                                        <select
                                            name="caratId"
                                            value={diamondData.caratId}
                                            onChange={handleDiamondChange}
                                            className="w-[400px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                        >
                                            <option value="">Select Carat</option>
                                            {caratOptions.map((option) => (
                                                <option key={option.id} value={option.id}>
                                                    {option.weight}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <label htmlFor="diamondGradingCode" className="block text-sm font-bold text-black mr-2">
                                            Diamond Grading Code:
                                        </label>
                                        <input
                                            type="text"
                                            name="diamondGradingCode"
                                            value={diamondData.diamondGradingCode}
                                            onChange={handleDiamondChange}
                                            placeholder="Diamond Grading Code"
                                            className="w-[300px] p-2 mr-3 border border-gray-300 rounded-md ml-auto"
                                        />
                                    </div>

                                </div>
                                <button
                                    type="submit"
                                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Back
                                </button>

                            </form>
                        )
                    }
                </div>
                <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-md">
                    <h3 className="text-xl text-blue-800 font-bold">Product Created</h3>
                    {formData && formData.ImgFile && (
                        <img
                            src={imagePreview}
                            alt="Product"
                            className="mt-2 mx-auto w-50 h-auto object-cover shadow-lg"
                        />
                    )}
                    <div className="grid grid-cols-2 gap-4 shadow-md p-4">
                        <div>
                            <p className="mb-2"><strong>CategoryId:</strong> {formData ? (formData.CategoryId || '') : ''}</p>
                            <p className="mb-2"><strong>Name:</strong> {formData ? (formData.Name || '') : ''}</p>
                            <p className="mb-2"><strong>MaterialCost:</strong> {formData ? (formData.MaterialCost || '') : ''}</p>
                            <p className="mb-2"><strong>ProductionCost:</strong> {formData ? (formData.ProductionCost || '') : ''}</p>
                            <p className="mb-2"><strong>GemCost:</strong> {formData ? (formData.GemCost || '') : ''}</p>
                            <p><strong>PriceRate:</strong> {formData ? (formData.PriceRate || '') : ''}</p>
                        </div>
                        {categoryType !== '5' && categoryType !== '6' && (
                            <div>
                                <p className="mb-2"><strong>Origin ID:</strong> {diamondData ? diamondData.originId : ''}</p>
                                <p className="mb-2"><strong>Shape ID:</strong> {diamondData ? diamondData.shapeId : ''}</p>
                                <p className="mb-2"><strong>Fluorescence ID:</strong> {diamondData ? diamondData.fluorescenceId : ''}</p>
                                <p className="mb-2"><strong>Color ID:</strong> {diamondData ? diamondData.colorId : ''}</p>
                                <p className="mb-2"><strong>Symmetry ID:</strong> {diamondData ? diamondData.symmetryId : ''}</p>
                                <p className="mb-2"><strong>Polish ID:</strong> {diamondData ? diamondData.polishId : ''}</p>
                                <p className="mb-2"><strong>Cut ID:</strong> {diamondData ? diamondData.cutId : ''}</p>
                                <p className="mb-2"><strong>Clarity ID:</strong> {diamondData ? diamondData.clarityId : ''}</p>
                                <p className="mb-2"><strong>Carat ID:</strong> {diamondData ? diamondData.caratId : ''}</p>
                                <p><strong>Diamond Grading Code:</strong> {diamondData ? diamondData.diamondGradingCode : ''}</p>
                            </div>
                        )}
                        {(categoryType === '5' || categoryType === '6') && (
                            <div>
                                <p className="mb-2"><strong>Material ID:</strong> {createdRetailGold ? createdRetailGold.materialId : ''}</p>
                                <p className="mb-2"><strong>weight:</strong> {createdRetailGold ? createdRetailGold.weight : ''}</p>

                            </div>
                        )}

                    </div>

                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!isSaveEnabled() && 'hidden'}`}
                        onClick={handleYesNo}
                    >
                        Save
                    </button>


                </div>

            </div>
            <button
                onClick={handleBack}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {/* <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> */}
                Back
            </button>
            {isYesNoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold text-black mb-4">Confilm to create</h2>
                        <p>Create new product ?</p>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                                onClick={() => {
                                    handleSubmitProduct();
                                    if (categoryType === '7') {
                                        handleSubmitDiamond();
                                    } else if (categoryType === '5') {
                                        handleCreateRetailGold();
                                    }
                                    setIsYesNoOpen(false);
                                }}
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                className="mr-2 ml-0 px-4 py-2 bg-red-500 text-white rounded-md"
                                onClick={() => setIsYesNoOpen(false)}
                            >
                                No
                            </button>
                        </div>


                    </div>
                </div>
            )}
        </div >
    );
}
