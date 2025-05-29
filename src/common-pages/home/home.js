import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import './home.css';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import MaterialButton from "@mui/material/Button";
import { Button } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useAuth0 } from "@auth0/auth0-react";
import ImageCatagoryContext from "../../context/imageCatagory";
import { FaCartArrowDown, FaDollarSign, FaDownload, FaRupeeSign } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { textDB } from "../../database/firebase";
import { FidgetSpinner } from "react-loader-spinner";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import 'react-tabs/style/react-tabs.css';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  width: '75%',
  borderRadius: '10px',
  overflow: 'hidden',
  border: 'none',
  outline: 'none'
};
const updateModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: '30%',
    borderRadius: '10px',
    overflow: 'hidden',
    border: 'none',
    outline: 'none'
}


export default function Home() {
  const contex = useContext(ImageCatagoryContext)
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const [open, setOpen] = React.useState(false);
  const [EditOpen, setEditOpen] = React.useState(false);
  const [RemoveModelOpend, setRemoveModel] = React.useState(false);
  const [itemData, setitemData] = useState([]);
  const [editImageData, seteditImageData] = useState('');
  const [filterData, setFilterData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditModelOpen = () => setEditOpen(true);
  const handleEditModelClose = () => setEditOpen(false);
  const RemoveModelOpen = () => setRemoveModel(true);
  const RemoveModelClose = () => setRemoveModel(false);
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const [SpinnerLoader, setSpinnerLoader] = useState(Boolean);
  const [formData, setFormData] = useState({});
  const [RemovedImageId, setRemovedImageId] = useState('');
  const [selectedCatagory, setselectedCatagory] = useState('');

  // Update Image Data 
  const [id, setid] = useState('');
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateCatagory, setUpdateCatagory] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [updatePricing,setUpdatepricing] = useState('');
  const [catagoryNewArray, setcatagoryNewArray] = useState([]);
  const [catagoryData, setcatagoryData] = useState([]);
  const [Discountlogo, setDiscountlogo] = useState('');
  const [DiscountedPrice, setDiscountedPrice] = useState('');

  useEffect(() => {

    const db = collection(textDB, 'publishImages');
    const getData = getDocs(db)
    setSpinnerLoader(true)
    getData.then(res => {
      const temp = res.docs.map(val => {
        const data = ({ ...val.data() })
        return data;
      });
      setitemData([...temp]);
      const prods = [...temp].filter((value, index, array) => index == array.findIndex(item => item.catagory == value.catagory));
      setcatagoryNewArray([...prods])
      setSpinnerLoader(false)
    })

    const storage = getStorage();
    const listRef1 = ref(storage, 'siteLogo/discount-lable.png');
    const image1 = getDownloadURL(listRef1)
    image1.then(siteLogo => setDiscountlogo(siteLogo))
  }, [])
  

  const editImage = (imageData) => {
    Resetdata()
      seteditImageData(imageData)
      handleEditModelOpen()
  } 

  const updateImageData = async(id) =>{
    
    const valRef = collection(textDB, "publishImages/")
    const getData = getDocs(valRef)
    getData.then(data => {
      data.docs.map(val => {
        const data = ({ ...val.data() })
        if(data.id == id){
          const taskDocRef = doc(textDB, 'publishImages/', val.id)
          updateDoc(taskDocRef,{title : updatedTitle}).then(() => handleClose(),handleEditModelClose(),toast.success("Image Updated Successfully") )
        }
      });
    })
  }

  const LoginCheck = (buttonName) => {
    if (isAuthenticated) {
      if (buttonName == 'download') {
        window.open(formData.img)
      }
      if (buttonName == 'buynow') {
        if (cart.length == 0) {
          dispatch(addToCart({ id: formData.id, title: formData.title, price: formData.discountPrice ? formData.discountPrice : formData.price, image: formData.img, des: formData.description, discount: formData.discount }))
          toast.success("Successfully Added In Cart")
        } else {
          if (!cart.find(x => x.id == formData.id)) {
            dispatch(addToCart({ id: formData.id, title: formData.title, price: formData.discountPrice ? formData.discountPrice : formData.price, image: formData.img, des: formData.description, discount: formData.discount }))
            toast.success("Successfully Added In Cart")
          } else {
            toast.error("Already Added")
          }
        }
        handleClose()
      }
      if (buttonName == 'addtocart') {
        if (cart.length == 0) {
          dispatch(addToCart({ id: formData.id, title: formData.title, price: formData.discountPrice ? formData.discountPrice : formData.price, image: formData.img, des: formData.description, discount: formData.discount }))
          toast.success("Successfully Added In Cart")
        } else {
          if (!cart.find(x => x.id == formData.id)) {
            dispatch(addToCart({ id: formData.id, title: formData.title, price: formData.discountPrice ? formData.discountPrice : formData.price, image: formData.img, des: formData.description, discount: formData.discount }))
            toast.success("Successfully Added In Cart")
          } else {
            toast.error("Already Added")
          }
        }
        handleClose()
      }
    } else {
      loginWithRedirect()
    }
  }

  

  const filterdata = () => {
    setcatagoryData([])
    const data = itemData.filter(data => {
      if(data.catagory == selectedCatagory){
        return data
      }
    })
    setcatagoryData([...data]);
    console.log(catagoryData)
  }
  // console.log(selectedCatagory)


  const removeImage = (id) => {
    const valRef = collection(textDB, "publishImages/")
    const getData = getDocs(valRef)
    getData.then(data => {
      data.docs.map(val => {
        const data = ({ ...val.data() })
        if(data.id == id){
          const taskDocRef = doc(textDB, 'publishImages/', val.id)
          deleteDoc(taskDocRef).then(() => toast.success("Image Removed Successfully") )
          RemoveModelClose()
        }
      });
    })
  }

  const Resetdata = () => {
    setUpdatedTitle(editImageData.title)
    setUpdateCatagory(editImageData.catagory)
    setUpdateDescription(editImageData.description)
    setUpdatePrice(editImageData.price)

  }


  return (
    <div className="main">
      <Toaster />
      <Container>
        {/* <div className="catagory-sidebar"> */}
          {/* <Tabs>
            <TabList>
           
              {catagoryNewArray.map(catagory => (
                <Tab><a onClick={() => setselectedCatagory(catagory.catagory)}>{catagory.catagory}</a></Tab>
              ))}
            </TabList>
          </Tabs> */}
          
        {/* </div> */}
        <div className="image-list">
          {
            itemData.length == 0 ?
              <div className="empty-message">
                <FidgetSpinner
                  visible={SpinnerLoader}
                  height="50"
                  width="50"
                  ariaLabel="fidget-spinner-loading"
                  wrapperStyle={{}}
                  wrapperClass="fidget-spinner-wrapper"
                />
                {SpinnerLoader == true ? '' : <h3>No image found</h3>}

              </div>
              :
             
                
                // itemData.map(item => (
                //   <>
                //   <div>
                //     <div className="images admin-images">
                //       {item.price == '' ? '' : <FaRupeeSign className="pricing-tag" />}
                //       <img className="image" src={item.img}></img>
                //       {!item.hasOwnProperty('discount') ? '' : 
                //         item.discount == "" ? '':
                //         <div className="discount-tag">
                //           <img className="discount-image" src={Discountlogo} />
                //           <span className="discount-lable">{item.discount}% OFF</span>
                //        </div>
                //       }
                //       <div className="image-details">
                //         <Button variant="primary" onClick={() => setFormData({
                //         catagory : item.catagory,
                //         description : item.description,
                //         id : item.id,
                //         img : item.img,
                //         price : item.price,
                //         title : item.title,
                //         discount : item.discount,
                //         discountPrice : item.discountPrice
                //       }, handleOpen())}>Preview Image</Button>
                //         <Button variant="secondary" onClick={() => (editImage(item),handleClose())}>Edit Image</Button>
                //         <Button variant="danger" onClick={() => setRemovedImageId(item.id,RemoveModelOpen())}>REMOVE</Button>
                //       </div>
                //     </div>
                //     </div>
                //   </>
                // ))
                
                
                  itemData.map(item => (
                      <div onClick={() => setFormData({
                        catagory : item.catagory,
                        description : item.description,
                        id : item.id,
                        img : item.img,
                        price : item.price,
                        title : item.title,
                        discount : item.discount,
                        discountPrice : item.discountPrice
                      }, handleOpen())}>
                        <div className="images">
                          {item.price == '' ? '' : <FaRupeeSign className="pricing-tag" />}
                          {!item.hasOwnProperty('discount') ? '' : 
                            item.discount == "" ? '':
                            <div className="discount-tag">
                              <img className="discount-image" src={Discountlogo} />
                              <span className="discount-lable">{item.discount}% OFF</span>
                          </div>
                          }
                          <img className="image" src={item.img}></img>
                          <div className="image-details">
                            <span>{item.title}</span>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    
                  ))
                
          }
          
        </div>
        
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="image-model"
      >
        <Box sx={style}>
        
              <>
                <div className="model-content">
                  <div className="model-image">
                    <img src={formData.img} ></img>
                  </div>
                  <div className="model-text">
                    <span>{formData.uploaded_date}</span>
                    <h2>{formData.title}</h2>
                    <p>{formData.description}</p>
                    <div className="amount">{!formData.price ?  'Free' : formData.discount ?  
                      <div className="discount-price-show">
                        <div className="amount-cal">
                          <h4 className="main-amount">({formData.price})</h4><h4 className="discont-amount">{formData.discountPrice}</h4>
                        </div>
                        <p className="discount-per">Discount : {formData.discount}%</p>
                      </div>
                     : formData.price}</div>
                    <div className="model-button">
                      {formData.price === '' ?
                        <button type="button" className="btn btn-success" target="_blank" onClick={() => LoginCheck('download')}><FaDownload size={20} />Download</button>
                        :
                        <><button type="button" className="btn btn-success" onClick={() => LoginCheck('buynow')}>Buy Now</button>
                          <button type="button" className="btn btn-warning" onClick={() => LoginCheck('addtocart')}><FaCartArrowDown size={20} /> Add to Cart</button></>
                      }
                    </div>
                  </div>
                </div>
              </>
        
        </Box>       
        
      </Modal>

      <Modal
        open={EditOpen}
        onClose={handleEditModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="update-image-model"
      >
        <Box sx={updateModelStyle}>

          <div className="model-content">
            <h2>Update Image Data</h2>
            <div className="form">
                <div className="uploaded-image">
                  <img src={editImageData.img} width={500} height={300}/>
                </div>
                <input type="text" placeholder="Image Title" value={updatedTitle ? updatedTitle : editImageData.title}  onChange={(e)=> setUpdatedTitle(e.target.value)}/>
                <textarea  placeholder="Image Description" value={updateDescription ? updateDescription : editImageData.description} />
                <select value={updateCatagory ? updateCatagory : editImageData.catagory}>
                    <option>Select Catagory</option>
                    <option>Food</option>
                    <option>Natural</option>
                    <option>Art</option>
                </select>
                <select value={editImageData.price == '' ? 'Free' : 'Paid'}>
                    <option>Select Pricing</option>
                    <option>Free</option>
                    <option>Paid</option>
                </select>
                <input type="number" disabled={!editImageData.price} value={updatePricing ? updatePricing : editImageData.price} placeholder="Image Price in Rupess"  />
                {/* <input type="file" onChange={(e)=>hadleupload(e)} /> */}
                <div className="button-section">
                  <Button variant="success" onClick={() => updateImageData(editImageData.id)} >Update</Button>
                  <Button variant="info" onClick={() => Resetdata()}>Reset</Button>
                </div>
            </div>
          </div>
         
        </Box>
      </Modal>

      {/* //Remove Item POP */}
      

      <Dialog
        open={RemoveModelOpend}
        onClose={RemoveModelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure Remove Image?"}
        </DialogTitle>
        <DialogActions>
            <MaterialButton onClick={() => removeImage(RemovedImageId)}>REMOVE</MaterialButton>
            <MaterialButton onClick={() => RemoveModelClose()}>Cancel</MaterialButton>
        </DialogActions>
      </Dialog>              

    </div>
  );
}