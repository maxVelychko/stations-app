export const generateRandomId = () => Math.random().toString(16).slice(2);

export const createStationMock = ({
  id = generateRandomId(),
  name = 'Name',
  description = 'Description',
  reliability = 35,
  popularity = 5,
  tags = ['hip hop'],
  imgUrl = 'image.jpg',
  streamUrl = 'http://example.com',
} = {}) => {
  return {
    id,
    name,
    description,
    reliability,
    popularity,
    tags,
    imgUrl,
    streamUrl,
  };
};
