<?php
// visitor-counter.php

// Prevent caching
header('Cache-Control: no-cache, must-revalidate');
header('Content-Type: application/json');

// File paths for storing visitor counts
$countFilePath = 'visitor_counts.txt';
$visitorLogPath = 'visitor_log.txt';
$totalCountPath = 'total_visitors.txt';  // New file for total visitor count

// Get current date information
$today = date('Y-m-d');
$thisMonth = date('Y-m');

// Initialize counts
$dailyCount = 0;
$monthlyCount = 0;
$totalCount = 0;  // Initialize total count

// Load existing data if the file exists
if (file_exists($countFilePath)) {
    $countData = json_decode(file_get_contents($countFilePath), true);
    
    // Check if we have data for today
    if (isset($countData['daily'][$today])) {
        $dailyCount = $countData['daily'][$today];
    }
    
    // Calculate monthly count
    if (isset($countData['monthly'][$thisMonth])) {
        $monthlyCount = $countData['monthly'][$thisMonth];
    }
} else {
    // Create new data structure
    $countData = [
        'daily' => [],
        'monthly' => [],
        'lastUpdate' => ''
    ];
}

// Load total visitor count
if (file_exists($totalCountPath)) {
    $totalCount = (int)file_get_contents($totalCountPath);
} else {
    $totalCount = 0;
    file_put_contents($totalCountPath, '0');
}

// Get visitor IP and other information for tracking unique visitors
$visitorIP = $_SERVER['REMOTE_ADDR'];
$userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Unknown';
$timestamp = date('Y-m-d H:i:s');

// Check if this is a new visitor for today by looking at logs
$isNewVisit = true;

if (file_exists($visitorLogPath)) {
    $todayLogFile = $visitorLogPath . '.' . $today;
    
    // Create a new log file for today if it doesn't exist
    if (!file_exists($todayLogFile)) {
        // Start a new log file for today
        file_put_contents($todayLogFile, '');
    }
    
    // Check if this IP has already visited today
    $todayLogs = file_get_contents($todayLogFile);
    if (strpos($todayLogs, $visitorIP) !== false) {
        $isNewVisit = false;
    }
}

// If this is a new visit, update counts and logs
if ($isNewVisit) {
    // Log the visit
    $logEntry = "$timestamp|$visitorIP|$userAgent\n";
    file_put_contents($visitorLogPath . '.' . $today, $logEntry, FILE_APPEND);
    
    // Update daily count
    $dailyCount++;
    $countData['daily'][$today] = $dailyCount;
    
    // Update monthly count
    if (!isset($countData['monthly'][$thisMonth])) {
        $countData['monthly'][$thisMonth] = 0;
    }
    $countData['monthly'][$thisMonth]++;
    $monthlyCount = $countData['monthly'][$thisMonth];
    
    // Update total count
    $totalCount++;
    file_put_contents($totalCountPath, (string)$totalCount);
    
    // Save updated count data
    $countData['lastUpdate'] = $timestamp;
    file_put_contents($countFilePath, json_encode($countData));
}

// Send response
echo json_encode([
    'dailyCount' => $dailyCount,
    'monthlyCount' => $monthlyCount,
    'totalCount' => $totalCount,  // Added total count to response
    'date' => $today
]);
?>