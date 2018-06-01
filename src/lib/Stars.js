class Stars {

  static avgRating(rating) {

    const displayStars = { __html: '' };

    for(let i = 0; i<Math.floor(rating); i++) {
      displayStars.__html += '<i class="fa fa-star fa-2x" style="color: #ffd700"></i>';
    }

    if(rating === 0){

      displayStars.__html += '<i class="fa fa-star-o fa-2x"></i><i class="fa fa-star-o fa-2x"></i><i class="fa fa-star-o fa-2x"></i><i class="fa fa-star-o fa-2x"></i><i class="fa fa-star-o fa-2x"></i>';

    } else if(rating % 1 > 0) {
      displayStars.__html += '<i class="fa fa-star-half-o fa-2x" style="color: #ffd700"></i>';
    }

    if(displayStars.__html.match(/star/g).length === 4){

      displayStars.__html += '<i class="fa fa-star-o fa-2x" style="color: #ffd700"></i>';
    } else if(displayStars.__html.match(/star/g).length === 3){

      displayStars.__html += '<i class="fa fa-star-o fa-2x" style="color: #ffd700"></i><i class="fa fa-star-o fa-2x" style="color: #ffd700"></i>';
    } else if(displayStars.__html.match(/star/g).length === 2){

      displayStars.__html += '<i class="fa fa-star-o fa-2x" style="color: #ffd700"></i><i class="fa fa-star-o fa-2x" style="color: #ffd700"></i><i class="fa fa-star-o fa-2x" style="color: #ffd700"></i>';
    } else if(displayStars.__html.match(/star/g).length === 1){

      displayStars.__html += '<i class="fa fa-star-o fa-2x" style="color: #ffd700"></i><i class="fa fa-star-o fa-2x" style="color: #ffd700"></i><i class="fa fa-star-o fa-2x" style="color: #ffd700"></i><i class="fa fa-star-o fa-2x" style="color: #ffd700"></i>';
    }

    return displayStars;
  }

}
export default Stars;
