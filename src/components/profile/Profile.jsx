import { Button, Card } from "react-bootstrap"
import "./profile.css"
import { FavoriteFalls } from "../waterfalls/FavoriteFalls"
import { useNavigate } from "react-router-dom"

export const Profile = ({userProfile, allWaterfalls, allLocations, getRegionNameById}) => {
    const navigate = useNavigate()
    return (
        <>
            <Card className="card-profile" border="success" style={{ width: '18rem' }}>
                <Button variant="warning" onClick={() => navigate("edit")}>Edit Profile</Button>
                <Card.Body>
                <Card.Title>{userProfile.name}</Card.Title>
                <Card.Text>{userProfile.address}</Card.Text>
                </Card.Body>
                <Card.Footer>{userProfile.email}</Card.Footer>
            </Card>

            <FavoriteFalls currentUser={userProfile} allWaterfalls={allWaterfalls} allLocations={allLocations} getRegionNameById={getRegionNameById} authoredWaterfalls={true}/>
        </>
    )
}