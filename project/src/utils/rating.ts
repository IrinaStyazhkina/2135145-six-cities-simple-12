export function getHotelStarsWidth(rating: number) {
  const roundedRating = Math.round(rating);
  switch (roundedRating) {
    case 0:
      return '0%';
    case 1:
      return '20%';
    case 2:
      return '40%';
    case 3:
      return '60%';
    case 4:
      return '80%';
    case 5:
      return '100%';
  }
}
