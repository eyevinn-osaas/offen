package config

import "fmt"

// Locale is a language used throughout the application's interface.
type Locale string

// Decode validates and assigns l.
func (l *Locale) Decode(s string) error {
	switch s {
	case "en":
		*l = Locale(s)
	default:
		return fmt.Errorf("unknown or unsupported locale %s", s)
	}
	return nil
}

func (l *Locale) String() string {
	return string(*l)
}
