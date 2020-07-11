'use strict';

function buildMakeMessages ({ Id }) {
    return function makeMessages({
        id = Id.getId(),
        userId,
        roomId,
        channelId,
        content,
        createdDate = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
    } = {}) {

        const updateContent = (newContent) => {
            content = newContent;
        }

        return Object.freeze({
            getId: () => id,
            getUserId: () => userId,
            getRoomId: () => roomId,
            getChannelId: () => channelId,
            getContent: () => content,
            getCreatedDate: () => createdDate,
            updateContent
        });
    };
};

module.exports = buildMakeMessages;
