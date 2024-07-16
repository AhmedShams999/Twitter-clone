import React from 'react'
import RightPanelSkeleton from '../skeletons/RightPanelSkeleton';
import { Link } from 'react-router-dom';
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";

function RightPanel() {
  const isLoading = false;
  return (
  <div className='right-panel'>
      <div className='right-panel__container'>
        <p className='right-panel__container__header'>Who to follow</p>
        <div className='right-panel__container__users'>
          {/* item */}
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            USERS_FOR_RIGHT_PANEL?.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className='right-panel__container__users__user link'
                key={user._id}
              >
                <div className='right-panel__container__users__user__info'>  
                  <img src={user.profileImg || "/avatar-placeholder.png"} className='right-panel__container__users__user__info__avatar'/>
                 
                  <div>
                      <p>
                          {user.fullName}
                      </p>
                      <p>
                        @{user.username}
                      </p>
                  </div>
                  
                </div>
                <button
                    onClick={(e) => e.preventDefault()}
                  >
                    Follow
                  </button>
               
              </Link>
            ))}
        </div>
      </div>
  </div>
  )
}

export default RightPanel
