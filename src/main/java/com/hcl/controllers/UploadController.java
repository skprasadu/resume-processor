package com.hcl.controllers;

import java.awt.Color;
import java.awt.Dimension;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletResponse;

import org.apache.tika.Tika;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kennycason.kumo.CollisionMode;
import com.kennycason.kumo.WordCloud;
import com.kennycason.kumo.WordFrequency;
import com.kennycason.kumo.bg.CircleBackground;
import com.kennycason.kumo.font.scale.SqrtFontScalar;
import com.kennycason.kumo.nlp.FrequencyAnalyzer;
import com.kennycason.kumo.palette.LinearGradientColorPalette;

/**
 * Created by XTL on 8/14/2014.
 */
@RestController
public class UploadController {

	@RequestMapping(value = "/uploadResume", method = RequestMethod.POST)
	@ResponseBody
	public void uploadResume(@RequestParam("file") MultipartFile file, HttpServletResponse response) throws Exception {
		Tika tika = new Tika();
		String extractedText = tika.parseToString(file.getInputStream());

		final FrequencyAnalyzer frequencyAnalyzer = new FrequencyAnalyzer();
		frequencyAnalyzer.setStopWords(loadStopWords());
		frequencyAnalyzer.setWordFrequenciesToReturn(500);
		frequencyAnalyzer.setMinWordLength(4);
		ArrayList<String> list = new ArrayList<>();
		list.add(extractedText);
		final List<WordFrequency> wordFrequencies = frequencyAnalyzer.load(list);
		final Dimension dimension = new Dimension(600, 600);
		final WordCloud wordCloud = new WordCloud(dimension, CollisionMode.PIXEL_PERFECT);
		wordCloud.setPadding(2);
		wordCloud.setBackground(new CircleBackground(300));
		// colors followed by and steps between
		wordCloud.setColorPalette(new LinearGradientColorPalette(Color.RED, Color.BLUE, Color.GREEN, 30, 30));
		wordCloud.setFontScalar(new SqrtFontScalar(10, 40));
		wordCloud.build(wordFrequencies);
		wordCloud.writeToStream("png", response.getOutputStream());
	}

	private List<String> loadStopWords() throws IOException {
		// TODO Auto-generated method stub
		try (InputStream resource = UploadController.class.getResourceAsStream("/stop-words.txt")) {
			List<String> doc = new BufferedReader(new InputStreamReader(resource, StandardCharsets.UTF_8)).lines()
					.collect(Collectors.toList());
			return doc;
		}
	}

	@RequestMapping(value = "/hello")
	public void hello() {
		System.out.println("Hello");
	}

}
