package model;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Note implements Serializable{
    private Integer id = null;
    private User author;
    private String title;
    private String text;
    
    public Note(User author, String title, String text){
        this.author = author;
        this.title = title;
        this.text = text;
    }
    
    public Note(Integer id, User author, String title, String text){
        this.id  = id;
        this.author = author;
        this.title = title;
        this.text = text;
    }
    
    public void setAuthor(User author){
        this.author = author;
    }
    
    public User getAuthor(){
        return author;
    }
    
    public void setTitle(String title){
        this.title = title;
    }
    
    public String getTitle(){
        return title;
    }
    
    public void setText(String text){
        this.text = text;
    }
    
    public String getText(){
        return text;
    }
    
    public int getId(){
        return id;
    }
    
    public static void addNote(Note note) throws SQLException, ClassNotFoundException{
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/3ddesktop", "root", "root");
        PreparedStatement stmt = conn.prepareStatement("insert into notes(author, title, text) values(?, ?, ?);");
        stmt.setInt(1, User.getIdByName(note.getAuthor().getName()));
        stmt.setString(2, note.getTitle());
        stmt.setString(3, note.getText());
        stmt.execute();
        conn.close();
    }
    
    public static void deleteNote(int noteId) throws ClassNotFoundException, SQLException{
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/3ddesktop", "root", "root");
        PreparedStatement stmt = conn.prepareStatement("delete from notes where id = ?;");
        stmt.setInt(1, noteId);
        stmt.execute();
        conn.close();
    }
    
    public static List getNotesByUser(User user) throws ClassNotFoundException, SQLException{
        List<Note> notes = new ArrayList<>();
        int userId = User.getIdByName(user.getName());
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/3ddesktop", "root", "root");
        PreparedStatement stmt = conn.prepareStatement("select * from notes where author = ?;");
        stmt.setInt(1, userId);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()){
            String title = rs.getString("title");
            String text = rs.getString("text");
            Integer id = rs.getInt("id");
            notes.add(new Note(id, user, title, text));
        }
        return notes;
    }
}
