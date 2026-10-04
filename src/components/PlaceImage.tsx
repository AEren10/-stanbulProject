import { useState } from 'react'
import { CAT_BY_ID } from '../data/categories'
import type { Place } from '../data/types'
import { usePhoto } from '../usePhoto'

interface Props {
  place: Place
  big?: boolean
  className?: string
}

export function PlaceImage({ place, big, className }: Props) {
  const photo = usePhoto(place)
  const [loaded, setLoaded] = useState(false)
  const [bigFailed, setBigFailed] = useState(false)
  const [failed, setFailed] = useState(false)
  const cat = CAT_BY_ID[place.cat]
  const src = photo ? (big && !bigFailed ? photo.big : photo.thumb) : null
  const showImg = src && !failed

  return (
    <div
      className={`pimg ${className ?? ''}`}
      style={{ ['--c' as string]: cat.color }}
    >
      <div className="pimg-fallback">
        <span className="pimg-emoji">{place.emoji}</span>
      </div>
      {showImg && (
        <img
          key={src}
          src={src}
          alt={place.tr}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={loaded ? 'in' : ''}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (big && !bigFailed && photo && src !== photo.thumb) setBigFailed(true)
            else setFailed(true)
          }}
        />
      )}
    </div>
  )
}
