

async function submitReview(event) {
    event.preventDefault(); 
    const reviewData = {
        uris: document.getElementById('albumUri').textContent,
        reviewTitle: document.getElementById("reviewTitle").value,
        reviewText: document.getElementById("reviewText").value,
        rating: parseFloat(document.getElementById("rating").value)
    };


    
    try {
        const response = await fetch("http://musicboxd-aiven-env.eba-bbjzqugv.eu-north-1.elasticbeanstalk.com/api/auth/review/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt') 
            },
            body: JSON.stringify(reviewData)
        });

        if (response.ok) {
            alert("Review submitted successfully!");
            document.getElementById("reviewForm").reset();
        } else {
            alert("Failed to submit review. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting review:", error);
        alert("An error occurred while submitting your review.");
    }
}
