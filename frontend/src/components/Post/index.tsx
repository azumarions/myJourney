import Image from 'next/image'
import Link from 'next/link'
import { POST } from '../../types'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const Post: React.FC<POST> = ({ id, title, img, description }) => {
  return (
    <ImageListItem>
              <Link href={`/post/${id}`}>
              <img
                src={`${img}?w=248&fit=crop&auto=format`}
                srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={title}
                loading="lazy"
              />
              </Link>
              <ImageListItemBar
                title={title}
                subtitle={description}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
  )
}
export default Post