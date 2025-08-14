import BooksChatWidgetSmallItem from "./BooksChatWidgetSmallItem";

export default function BooksChatWidgetSmallList({ item }) {
    const hasItems = item?.items?.length > 0;

    return (
        <div className="helper-chat--item-body">
            <div className="helper-chat-result--request-wrapper">
                <div className="helper-chat-result--request-text">{item.userRequest}</div>
                <div className="helper-chat-result--request-date">{item.dateTime.time12}</div>
            </div>
            <div className="helper-chat-result--response-wrapper">
                <div className="helper-chat-result--heading h4">Here is the result for your request.</div>
                <div className="helper-chat-result--list">
                    {hasItems ? (
                        item.items.map(i => (
                            <BooksChatWidgetSmallItem
                                key={i.id}
                                assistantResponse={i.assistantResponse}
                                post={i.post}
                            />
                        ))
                    ) : item.emptyResponse}
                </div>
            </div>
        </div>

    );
}
