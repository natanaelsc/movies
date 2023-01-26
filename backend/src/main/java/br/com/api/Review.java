package br.com.api;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collation = "reviews")
@Data
@NoArgsConstructor
public class Review {

    private ObjectId id;
    private String body;

    public Review(String body) {
        this.body = body;
    }
}
