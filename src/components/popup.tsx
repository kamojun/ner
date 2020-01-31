import React from 'react'
import { ToggleLayer, Arrow, Transition, useHover } from "react-laag";

function Tooltip({ children, text }) {
  const [isOpen, hoverProps] = useHover();
  return (
    <ToggleLayer
      isOpen={isOpen}
      renderLayer={({ isOpen, layerProps, arrowStyle }) => (
        <Transition isOpen={isOpen}>
          {(isOpen, onTransitionEnd) => (
            <div
              ref={layerProps.ref}
              onTransitionEnd={onTransitionEnd}
              style={{
                ...layerProps.style,
                backgroundColor: "silver",
                color: "black",
                padding: "2px 8px",
                fontSize: 12,
                borderRadius: 2,
                transition: "0.2s",
                opacity: isOpen ? 1 : 0
              }}
            >
              <ul>
                <li>その1</li>
                <li>その2</li>
              </ul>
              <Arrow size={4} style={arrowStyle} backgroundColor="black" />
            </div>
          )}
        </Transition>
      )}
    >
      {({ triggerRef }) => (
        <span ref={triggerRef} {...hoverProps}>
          {children}
        </span>
      )}
    </ToggleLayer>
  );
}

export default Tooltip