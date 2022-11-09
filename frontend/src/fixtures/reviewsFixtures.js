const reviewsFixtures = {
    oneReview: {
        "id": 1,
        "itemId": 10,
        "reviewerEmail": "brockgaucho@ucsb.edu",
        "stars": 5,
        "dateReviewed": "2022-03-02T12:00:00",
        "comments": "Good food today!",
    },
    threeReviews: [
        {
            "id": 2,
            "itemId": 314,
            "reviewerEmail": "chrisgaucho@ucsb.edu",
            "stars": 4,
            "dateReviewed": "2022-06-02T12:00:00",
            "comments": "Decent food today!",
        },
        {
            "id": 3,
            "itemId": 218,
            "reviewerEmail": "markgaucho@ucsb.edu",
            "stars": 2,
            "dateReviewed": "2022-05-02T12:00:00",
            "comments": "Bad food today!",
        },
        {
            "id": 4,
            "itemId": 0,
            "reviewerEmail": "philgaucho@ucsb.edu",
            "stars": 1,
            "dateReviewed": "2022-04-02T12:00:00",
            "comments": "Worst food today!",
        }
    ]
};


export { reviewsFixtures };