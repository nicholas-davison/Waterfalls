import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { saveUserProfileChanges } from "../../services/userService"
import "./profile.css"

export const EditProfile = ({userProfile, getAndSetUserProfile}) => {
    const [updatedProfileInfo, setUpdatedProfileInfo] = useState({id: userProfile.id, name: userProfile.name, address: userProfile.address, email: userProfile.email})
    const navigate = useNavigate()
    const handleChange = (event) => {
        const profileCopy = {...updatedProfileInfo}
        profileCopy[event.target.name] = event.target.value
        setUpdatedProfileInfo(profileCopy)
    }

    const handleSaveUserChanges = async (event) => {
        event.preventDefault()
        await saveUserProfileChanges(updatedProfileInfo).then(() => {
            getAndSetUserProfile()
            navigate("/profile")
        })
    }
    return (
        <Form className="form-profile-edit">
            <Form.Group className="mb-3" controlId="form-profile" >
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Name" 
                    value={updatedProfileInfo.name} 
                    name="name"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form-profile">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Address" 
                    value={updatedProfileInfo.address} 
                    name="address"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form-profile">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Email" 
                    value={updatedProfileInfo.email} 
                    name="email"
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="success" onClick={handleSaveUserChanges}>Save</Button>
        </Form>
    )
}