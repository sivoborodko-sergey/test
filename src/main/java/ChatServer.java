import javax.inject.Singleton;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;


@ServerEndpoint(value = "/chat/{username}")
@Singleton
public class ChatServer {

    @OnOpen
    public void onOpen(Session userSession, @PathParam("username") String username) throws IOException {
        onMessage("User: " + username + " has connected to the chat", userSession);
    }
//LOL//


    //LOL2//
    @OnClose
    public void onClose(Session userSession) throws IOException {
        System.out.println(userSession.getOpenSessions().size());
        System.out.println("Connection closed. Id: " + userSession.getId());
    }

    @OnMessage
    public void onMessage(String message, Session userSession) {
        for (Session session : userSession.getOpenSessions()) {
            session.getAsyncRemote().sendText(message);
        }
    }
}