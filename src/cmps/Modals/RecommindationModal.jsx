import React from 'react'
import { getSpotifySvg } from '../../services/SVG.service'

export function RecommindationModal({ closeRecommindationModal }) {
  return (
    <section className="recommendation-modal-backdrop">
      <div className="recommendation-modal">
        <h1>About recommendations</h1>
        <button onClick={closeRecommindationModal}>
          {' '}
          <span
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('recommindationModalIcon'),
            }}
          ></span>
        </button>
        <div className="line"></div>
        <div className="recommendation-modla-text">
          <p>
            Our recommendations help you find audio you'll enjoy, whether that's
            an old favorite or a new song or show you never knew you'd be into.
          </p>
          <p>
            Our editors have extensive knowledge about music and culture, and
            make sure our playlists are created with the best listener
            experience in mind.
          </p>
          <p>
            Our personalized recommendations are tailored to your unique taste,
            taking into account a variety of factors, such as what you're
            listening to and when, the listening habits of people who have
            similar taste in music and podcasts, and the expertise of our music
            and podcast specialists.
          </p>
          <p>
            In some cases, commercial considerations may influence our
            recommendations, but listener satisfaction is our priority and we
            only ever recommend content we think you'll want to hear.
          </p>
          <p>
            Our recommendations rely on signals from you, so keep on listening
            to the songs and podcasts you love!
          </p>
        </div>
      </div>
    </section>
  )
}
