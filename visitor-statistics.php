<?php
// visitor-statistics.php

// Prevent caching
header('Cache-Control: no-cache, must-revalidate');
header('Content-Type: application/json');

// File paths for storing visitor counts
$countFilePath = 'visitor_counts.txt';
$visitorLogPath = 'visitor_log.txt';
$totalCountPath = 'total_visitors.txt';
$currentVisitorsPath = 'current_visitors.txt';
$detailedLogPath = 'detailed_visitor_log.txt';
$sessionTimeout = 15 * 60; // 15 minutes session timeout

// Get current date information
$today = date('Y-m-d');
$thisMonth = date('Y-m');
$currentTime = time();

// Initialize counts
$dailyVisitors = 0;
$totalVisitors = 0;
$currentVisitors = 0;

// Get visitor IP and other information
$userIP = $_SERVER['REMOTE_ADDR'];
$userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Unknown';
$timestamp = date('Y-m-d H:i:s');

// Get country based on IP (using free IP geolocation API)
$userCountry = 'غير معروف'; // Default value
try {
    $ipInfoUrl = "http://ip-api.com/json/{$userIP}?fields=country,status";
    $ipResponse = @file_get_contents($ipInfoUrl);
    if ($ipResponse) {
        $ipData = json_decode($ipResponse, true);
        if ($ipData && isset($ipData['status']) && $ipData['status'] === 'success') {
            $userCountry = $ipData['country'];
        }
    }
} catch (Exception $e) {
    // Silently fail if IP lookup doesn't work
}

// Load daily visitors
if (file_exists($countFilePath)) {
    $countData = json_decode(file_get_contents($countFilePath), true);
    if (isset($countData['daily'][$today])) {
        $dailyVisitors = $countData['daily'][$today];
    }
} else {
    $countData = ['daily' => [], 'monthly' => [], 'lastUpdate' => ''];
}

// Load total visitors
if (file_exists($totalCountPath)) {
    $totalVisitors = (int)file_get_contents($totalCountPath);
} else {
    $totalVisitors = 0;
    file_put_contents($totalCountPath, '0');
}

// Handle current visitors (active sessions)
$activeSessions = [];
if (file_exists($currentVisitorsPath)) {
    $activeSessions = json_decode(file_get_contents($currentVisitorsPath), true) ?: [];
}

// Clean up expired sessions
foreach ($activeSessions as $ip => $lastActivity) {
    if ($currentTime - $lastActivity > $sessionTimeout) {
        unset($activeSessions[$ip]);
    }
}

// Update current user's session
$activeSessions[$userIP] = $currentTime;

// Count active sessions
$currentVisitors = count($activeSessions);

// Save updated sessions
file_put_contents($currentVisitorsPath, json_encode($activeSessions));

// Check if this is a new visit for today
$isNewVisit = true;
$todayLogFile = $visitorLogPath . '.' . $today;

if (file_exists($todayLogFile)) {
    // Check if this IP has already visited today
    $todayLogs = file_get_contents($todayLogFile);
    if (strpos($todayLogs, $userIP) !== false) {
        $isNewVisit = false;
    }
} else {
    // Create a new log file for today
    file_put_contents($todayLogFile, '');
}

// If this is a new visit, update counts and logs
if ($isNewVisit) {
    // Log the visit
    $logEntry = "$timestamp|$userIP|$userCountry|$userAgent\n";
    file_put_contents($todayLogFile, $logEntry, FILE_APPEND);
    
    // Also add to detailed visitor log
    $visitorDetail = [
        'timestamp' => $timestamp,
        'ip' => $userIP,
        'country' => $userCountry,
        'agent' => $userAgent
    ];
    
    // Load and update detailed log
    $detailedLog = [];
    if (file_exists($detailedLogPath)) {
        $detailedLog = json_decode(file_get_contents($detailedLogPath), true) ?: [];
    }
    
    // Add new entry at the beginning (newest first)
    array_unshift($detailedLog, $visitorDetail);
    
    // Keep only the last 1000 entries to avoid the file growing too large
    if (count($detailedLog) > 1000) {
        $detailedLog = array_slice($detailedLog, 0, 1000);
    }
    
    // Save updated detailed log
    file_put_contents($detailedLogPath, json_encode($detailedLog));
    
    // Update daily count
    $dailyVisitors++;
    $countData['daily'][$today] = $dailyVisitors;
    
    // Update total count
    $totalVisitors++;
    file_put_contents($totalCountPath, (string)$totalVisitors);
    
    // Save updated count data
    $countData['lastUpdate'] = $timestamp;
    file_put_contents($countFilePath, json_encode($countData));
}

// Load visitor log for display
$visitorLog = [];
if (file_exists($detailedLogPath)) {
    $visitorLog = json_decode(file_get_contents($detailedLogPath), true) ?: [];
}

// Send response
echo json_encode([
    'currentVisitors' => $currentVisitors,
    'dailyVisitors' => $dailyVisitors,
    'totalVisitors' => $totalVisitors,
    'userIP' => $userIP,
    'userCountry' => $userCountry,
    'visitDate' => $timestamp,
    'visitorLog' => $visitorLog
]);
?>