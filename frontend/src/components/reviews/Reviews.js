import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {

    const reviewText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [])

    const addReview = async (e) => {

        e.preventDefault();

        const review = reviewText.current;

        try {

            const response = await api.post("/reviews", {
                reviewBody: review.value,
                movieId: movieId
            });

            const updateReviews = [...reviews, { body: review.value }];

            review.value = "";

            setReviews(updateReviews);

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} reviewText={reviewText} labelText="Write a Review?" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((review, i) => {
                            return (
                                <span key={i}>
                                    <Row>
                                        <Col>{review.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </span>
                            )
                        })
                    }
                </Col >
            </Row >
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container >
    )
}

export default Reviews;