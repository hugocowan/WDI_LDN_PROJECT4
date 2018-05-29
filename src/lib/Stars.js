class Stars {

  static avgRating(comments) {

    const displayStars = { __html: '' };
    const totalStars = comments.reduce((total, comment) => total + parseInt(comment.rating), 0);
    const averageStars = Math.round((totalStars/comments.length)*2)/2;

    for(let i = 0; i<Math.floor(averageStars); i++) {
      displayStars.__html += '<i class="fa fa-star fa-2x" style="color: #ffd700"></i>';
    }
    
    if(averageStars % 1 > 0) displayStars.__html += '<i class="fa fa-star-half fa-2x" style="color: #ffd700"></i>';
    return displayStars;
  }

}
export default Stars;
