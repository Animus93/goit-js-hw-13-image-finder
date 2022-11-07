import { createClient } from 'pexels';

const key = '563492ad6f917000010000013830ffe8dd97484e8017c9e19531aff0';
const client = createClient(`${key}`);


function fetchQuery(newQuery, page = 1, elements = 12){
    return client.photos.search({query: newQuery, page: page,per_page: elements});
};

export default fetchQuery