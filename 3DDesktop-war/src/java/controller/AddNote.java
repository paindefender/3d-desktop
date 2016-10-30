package controller;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.Note;
import model.User;

/**
 *
 * @author Paindefender
 */
@WebServlet(urlPatterns = {"/new"})
public class AddNote extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet AddNote</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet AddNote at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session == null){
            response.sendRedirect("login");
        } else {
            User user = (User)session.getAttribute("user");
            response.setContentType("text/html;charset=UTF-8");
            try (PrintWriter out = response.getWriter()){
                out.println("<!DOCTYPE html>\n" +
                            "<html>\n" +
                            "  <head>\n" +
                            "    <meta charset=\"utf-8\">\n" +
                            "    <title>Add new note</title>\n" +
                            "  </head>\n" +
                            "  <body>\n" +
                            "    <form action=\"new\" method=\"post\">\n" +
                            "      <table>\n" +
                            "        <tr>\n" +
                            "          <td>Author</td><td>" + user.getName() + "</td>\n" +
                            "        </tr>\n" +
                            "        <tr>\n" +
                            "          <td>Title</td><td><input type=\"text\" name=\"title\" value=\"Default Title\"></td>\n" +
                            "        </tr>\n" +
                            "        <tr>\n" +
                            "          <td>Text</td><td><textarea rows=\"10\" cols=\"45\" name=\"text\"></textarea></td>\n" +
                            "        </tr>\n" +
                            "        <tr>\n" +
                            "          <td colspan=2 align=\"right\"><input type=\"submit\" value=\"Add note\"></td>\n" +
                            "        </tr>\n" +
                            "      </table>\n" +
                            "    </form>\n" +
                            "  </body>\n" +
                            "</html>");
            }
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session == null){
            response.sendRedirect("login");
        } else {
            Map<String, String[]> m = request.getParameterMap();
            if (m.containsKey("title") && m.containsKey("text")){
            String[] title = m.get("title");
            String[] text = m.get("text");
            User user = (User)session.getAttribute("user");
            Note note = new Note(user, title[0], text[0]);
            try {
                Note.addNote(note);
                response.sendRedirect("");
            } catch (Exception ex) {
                response.sendRedirect("new");
            }
        } else {
            response.sendRedirect("new");
        }
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
