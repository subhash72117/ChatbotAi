package com.ai.SpringAi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GenAIController {
    private final ChatService chatService;

    // Constructor-based dependency injection
    public GenAIController(ChatService chatService) {
        this.chatService = chatService;
    }

    // Endpoint to handle the /ask-ai requests
    @GetMapping("/ask-ai")
    public String getResponse(@RequestParam String prompt) {
        // Call the ChatService and return the response
        return chatService.getResponse(prompt);
    }
}
